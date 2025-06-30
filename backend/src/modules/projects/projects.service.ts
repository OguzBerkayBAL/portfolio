import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Project, ProjectStatus } from '../../entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { QueryProjectDto } from './dto/query-project.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) { }

    async create(createProjectDto: CreateProjectDto): Promise<Project> {
        const project = this.projectRepository.create(createProjectDto);
        return await this.projectRepository.save(project);
    }

    async findAll(queryDto: QueryProjectDto) {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'ASC', ...filters } = queryDto;

        const queryBuilder = this.projectRepository.createQueryBuilder('project');

        // Apply filters
        this.applyFilters(queryBuilder, filters);

        // Apply sorting
        queryBuilder.orderBy(`project.${sortBy}`, sortOrder);

        // Apply pagination
        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);

        // Get results with count
        const [projects, total] = await queryBuilder.getManyAndCount();

        return {
            data: projects,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findOne(id: string): Promise<Project> {
        const project = await this.projectRepository.findOne({
            where: { id },
        });

        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }

        return project;
    }

    async findFeatured(): Promise<Project[]> {
        return await this.projectRepository.find({
            where: { featured: true },
            order: { createdAt: 'ASC' },
        });
    }

    async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
        const project = await this.findOne(id); // This will throw if not found

        // Update the project
        Object.assign(project, updateProjectDto);
        project.updatedAt = new Date();

        return await this.projectRepository.save(project);
    }

    async remove(id: string): Promise<void> {
        const project = await this.findOne(id); // This will throw if not found
        await this.projectRepository.remove(project);
    }

    async getProjectStats() {
        const [total, completed, inProgress, featured] = await Promise.all([
            this.projectRepository.count(),
            this.projectRepository.count({ where: { status: ProjectStatus.COMPLETED } }),
            this.projectRepository.count({ where: { status: ProjectStatus.IN_PROGRESS } }),
            this.projectRepository.count({ where: { featured: true } }),
        ]);

        return {
            total,
            completed,
            inProgress,
            featured,
            completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
        };
    }

    private applyFilters(
        queryBuilder: SelectQueryBuilder<Project>,
        filters: Partial<QueryProjectDto>,
    ) {
        const { status, featured, search, technology } = filters;

        if (status) {
            queryBuilder.andWhere('project.status = :status', { status });
        }

        if (featured !== undefined) {
            queryBuilder.andWhere('project.featured = :featured', { featured });
        }

        if (search) {
            queryBuilder.andWhere(
                '(project.title ILIKE :search OR project.description ILIKE :search)',
                { search: `%${search}%` },
            );
        }

        if (technology) {
            queryBuilder.andWhere(
                ':technology = ANY(project.technologies)',
                { technology },
            );
        }
    }
} 