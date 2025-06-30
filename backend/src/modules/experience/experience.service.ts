import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Experience } from '../../entities/experience.entity';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { QueryExperienceDto } from './dto/query-experience.dto';

@Injectable()
export class ExperienceService {
    constructor(
        @InjectRepository(Experience)
        private readonly experienceRepository: Repository<Experience>,
    ) { }

    async create(createExperienceDto: CreateExperienceDto): Promise<Experience> {
        const experience = this.experienceRepository.create(createExperienceDto);

        // Convert string dates to Date objects
        experience.startDate = new Date(createExperienceDto.startDate);
        experience.endDate = createExperienceDto.endDate ? new Date(createExperienceDto.endDate) : undefined;

        return await this.experienceRepository.save(experience);
    }

    async findAll(queryDto: QueryExperienceDto) {
        const { page = 1, limit = 10, sortBy = 'startDate', sortOrder = 'DESC', ...filters } = queryDto;

        const queryBuilder = this.experienceRepository.createQueryBuilder('experience');

        // Apply filters
        this.applyFilters(queryBuilder, filters);

        // Apply sorting
        queryBuilder.orderBy(`experience.${sortBy}`, sortOrder);

        // Secondary sort for consistent ordering
        if (sortBy !== 'startDate') {
            queryBuilder.addOrderBy('experience.startDate', 'DESC');
        }

        // Apply pagination
        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);

        // Get results with count
        const [experiences, total] = await queryBuilder.getManyAndCount();

        return {
            data: experiences,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findOne(id: string): Promise<Experience> {
        const experience = await this.experienceRepository.findOne({
            where: { id },
        });

        if (!experience) {
            throw new NotFoundException(`Experience node with ID ${id} not found in career matrix`);
        }

        return experience;
    }

    async findCurrent(): Promise<Experience[]> {
        return await this.experienceRepository.find({
            where: { current: true },
            order: { startDate: 'DESC' },
        });
    }

    async getCareerTimeline(): Promise<Experience[]> {
        return await this.experienceRepository.find({
            order: { startDate: 'DESC' },
        });
    }

    async update(id: string, updateExperienceDto: UpdateExperienceDto): Promise<Experience> {
        const experience = await this.findOne(id); // This will throw if not found

        // Update the experience
        Object.assign(experience, updateExperienceDto);

        // Handle date conversions separately
        if (updateExperienceDto.startDate) {
            experience.startDate = new Date(updateExperienceDto.startDate);
        }
        if (updateExperienceDto.endDate !== undefined) {
            experience.endDate = updateExperienceDto.endDate ? new Date(updateExperienceDto.endDate) : undefined;
        }

        return await this.experienceRepository.save(experience);
    }

    async remove(id: string): Promise<void> {
        const experience = await this.findOne(id); // This will throw if not found
        await this.experienceRepository.remove(experience);
    }

    async getCareerStats() {
        const [total, current, totalYears, companiesCount, techStats] = await Promise.all([
            this.experienceRepository.count(),
            this.experienceRepository.count({ where: { current: true } }),
            this.calculateTotalExperience(),
            this.getUniqueCompaniesCount(),
            this.getTechnologyStats(),
        ]);

        return {
            total,
            current,
            totalYears,
            companiesCount,
            techStats,
            averageJobDuration: totalYears > 0 ? Math.round((totalYears / total) * 10) / 10 : 0,
        };
    }

    async getTechnologyStats() {
        const experiences = await this.experienceRepository.find();
        const techCount = {};

        experiences.forEach(exp => {
            if (exp.technologies) {
                exp.technologies.forEach(tech => {
                    techCount[tech] = (techCount[tech] || 0) + 1;
                });
            }
        });

        // Sort by usage count
        const sortedTechs = Object.entries(techCount)
            .sort(([, a], [, b]) => (b as number) - (a as number))
            .slice(0, 10); // Top 10

        return {
            totalTechnologies: Object.keys(techCount).length,
            topTechnologies: sortedTechs.map(([tech, count]) => ({ technology: tech, count })),
        };
    }

    private async calculateTotalExperience(): Promise<number> {
        const experiences = await this.experienceRepository.find();

        let totalMonths = 0;

        for (const exp of experiences) {
            const startDate = new Date(exp.startDate);
            const endDate = exp.endDate || new Date();

            const monthsDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12
                + (endDate.getMonth() - startDate.getMonth());

            totalMonths += monthsDiff;
        }

        return Math.round((totalMonths / 12) * 10) / 10; // Years with 1 decimal
    }

    private async getUniqueCompaniesCount(): Promise<number> {
        const result = await this.experienceRepository
            .createQueryBuilder('experience')
            .select('COUNT(DISTINCT experience.company)', 'count')
            .getRawOne();

        return parseInt(result.count) || 0;
    }

    private applyFilters(
        queryBuilder: SelectQueryBuilder<Experience>,
        filters: Partial<QueryExperienceDto>,
    ) {
        const { company, technology, current, search, startDateAfter, startDateBefore } = filters;

        if (company) {
            queryBuilder.andWhere('experience.company ILIKE :company', { company: `%${company}%` });
        }

        if (technology) {
            queryBuilder.andWhere(':technology = ANY(experience.technologies)', { technology });
        }

        if (current !== undefined) {
            queryBuilder.andWhere('experience.current = :current', { current });
        }

        if (search) {
            queryBuilder.andWhere(
                '(experience.title ILIKE :search OR experience.company ILIKE :search OR experience.description ILIKE :search)',
                { search: `%${search}%` },
            );
        }

        if (startDateAfter) {
            queryBuilder.andWhere('experience.startDate >= :startDateAfter', {
                startDateAfter: new Date(startDateAfter)
            });
        }

        if (startDateBefore) {
            queryBuilder.andWhere('experience.startDate <= :startDateBefore', {
                startDateBefore: new Date(startDateBefore)
            });
        }
    }
} 