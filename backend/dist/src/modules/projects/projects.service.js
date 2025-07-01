"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("../../entities/project.entity");
let ProjectsService = class ProjectsService {
    projectRepository;
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    async create(createProjectDto) {
        const project = this.projectRepository.create(createProjectDto);
        return await this.projectRepository.save(project);
    }
    async findAll(queryDto) {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'ASC', ...filters } = queryDto;
        const queryBuilder = this.projectRepository.createQueryBuilder('project');
        this.applyFilters(queryBuilder, filters);
        queryBuilder.orderBy(`project.${sortBy}`, sortOrder);
        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);
        const [projects, total] = await queryBuilder.getManyAndCount();
        return {
            data: projects,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const project = await this.projectRepository.findOne({
            where: { id },
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        return project;
    }
    async findFeatured() {
        return await this.projectRepository.find({
            where: { featured: true },
            order: { createdAt: 'ASC' },
        });
    }
    async update(id, updateProjectDto) {
        const project = await this.findOne(id);
        Object.assign(project, updateProjectDto);
        project.updatedAt = new Date();
        return await this.projectRepository.save(project);
    }
    async remove(id) {
        const project = await this.findOne(id);
        await this.projectRepository.remove(project);
    }
    async getProjectStats() {
        const [total, completed, inProgress, featured] = await Promise.all([
            this.projectRepository.count(),
            this.projectRepository.count({ where: { status: project_entity_1.ProjectStatus.COMPLETED } }),
            this.projectRepository.count({ where: { status: project_entity_1.ProjectStatus.IN_PROGRESS } }),
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
    applyFilters(queryBuilder, filters) {
        const { status, featured, search, technology } = filters;
        if (status) {
            queryBuilder.andWhere('project.status = :status', { status });
        }
        if (featured !== undefined) {
            queryBuilder.andWhere('project.featured = :featured', { featured });
        }
        if (search) {
            queryBuilder.andWhere('(project.title ILIKE :search OR project.description ILIKE :search)', { search: `%${search}%` });
        }
        if (technology) {
            queryBuilder.andWhere(':technology = ANY(project.technologies)', { technology });
        }
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map