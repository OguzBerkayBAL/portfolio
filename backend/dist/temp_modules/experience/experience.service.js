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
exports.ExperienceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const experience_entity_1 = require("../../entities/experience.entity");
let ExperienceService = class ExperienceService {
    experienceRepository;
    constructor(experienceRepository) {
        this.experienceRepository = experienceRepository;
    }
    async create(createExperienceDto) {
        const experience = this.experienceRepository.create(createExperienceDto);
        experience.startDate = new Date(createExperienceDto.startDate);
        experience.endDate = createExperienceDto.endDate ? new Date(createExperienceDto.endDate) : undefined;
        return await this.experienceRepository.save(experience);
    }
    async findAll(queryDto) {
        const { page = 1, limit = 10, sortBy = 'startDate', sortOrder = 'DESC', ...filters } = queryDto;
        const queryBuilder = this.experienceRepository.createQueryBuilder('experience');
        this.applyFilters(queryBuilder, filters);
        queryBuilder.orderBy(`experience.${sortBy}`, sortOrder);
        if (sortBy !== 'startDate') {
            queryBuilder.addOrderBy('experience.startDate', 'DESC');
        }
        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);
        const [experiences, total] = await queryBuilder.getManyAndCount();
        return {
            data: experiences,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const experience = await this.experienceRepository.findOne({
            where: { id },
        });
        if (!experience) {
            throw new common_1.NotFoundException(`Experience node with ID ${id} not found in career matrix`);
        }
        return experience;
    }
    async findCurrent() {
        return await this.experienceRepository.find({
            where: { current: true },
            order: { startDate: 'DESC' },
        });
    }
    async getCareerTimeline() {
        return await this.experienceRepository.find({
            order: { startDate: 'DESC' },
        });
    }
    async update(id, updateExperienceDto) {
        const experience = await this.findOne(id);
        Object.assign(experience, updateExperienceDto);
        if (updateExperienceDto.startDate) {
            experience.startDate = new Date(updateExperienceDto.startDate);
        }
        if (updateExperienceDto.endDate !== undefined) {
            experience.endDate = updateExperienceDto.endDate ? new Date(updateExperienceDto.endDate) : undefined;
        }
        return await this.experienceRepository.save(experience);
    }
    async remove(id) {
        const experience = await this.findOne(id);
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
        const sortedTechs = Object.entries(techCount)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10);
        return {
            totalTechnologies: Object.keys(techCount).length,
            topTechnologies: sortedTechs.map(([tech, count]) => ({ technology: tech, count })),
        };
    }
    async calculateTotalExperience() {
        const experiences = await this.experienceRepository.find();
        let totalMonths = 0;
        for (const exp of experiences) {
            const startDate = new Date(exp.startDate);
            const endDate = exp.endDate || new Date();
            const monthsDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12
                + (endDate.getMonth() - startDate.getMonth());
            totalMonths += monthsDiff;
        }
        return Math.round((totalMonths / 12) * 10) / 10;
    }
    async getUniqueCompaniesCount() {
        const result = await this.experienceRepository
            .createQueryBuilder('experience')
            .select('COUNT(DISTINCT experience.company)', 'count')
            .getRawOne();
        return parseInt(result.count) || 0;
    }
    applyFilters(queryBuilder, filters) {
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
            queryBuilder.andWhere('(experience.title ILIKE :search OR experience.company ILIKE :search OR experience.description ILIKE :search)', { search: `%${search}%` });
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
};
exports.ExperienceService = ExperienceService;
exports.ExperienceService = ExperienceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(experience_entity_1.Experience)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ExperienceService);
//# sourceMappingURL=experience.service.js.map