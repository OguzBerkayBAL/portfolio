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
exports.SkillsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const skill_entity_1 = require("../../entities/skill.entity");
let SkillsService = class SkillsService {
    skillRepository;
    constructor(skillRepository) {
        this.skillRepository = skillRepository;
    }
    async create(createSkillDto) {
        const skill = this.skillRepository.create(createSkillDto);
        return await this.skillRepository.save(skill);
    }
    async findAll(queryDto) {
        const { page = 1, limit = 20, sortBy = 'category', sortOrder = 'ASC', ...filters } = queryDto;
        const queryBuilder = this.skillRepository.createQueryBuilder('skill');
        this.applyFilters(queryBuilder, filters);
        if (sortBy === 'category') {
            queryBuilder.orderBy('skill.category', sortOrder);
            queryBuilder.addOrderBy('skill.order', 'ASC');
        }
        else {
            queryBuilder.orderBy(`skill.${sortBy}`, sortOrder);
        }
        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);
        const [skills, total] = await queryBuilder.getManyAndCount();
        return {
            data: skills,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findByCategory(category) {
        return await this.skillRepository.find({
            where: { category },
            order: { order: 'ASC', level: 'DESC' },
        });
    }
    async findOne(id) {
        const skill = await this.skillRepository.findOne({
            where: { id },
        });
        if (!skill) {
            throw new common_1.NotFoundException(`Skill with ID ${id} not found in the matrix`);
        }
        return skill;
    }
    async update(id, updateSkillDto) {
        const skill = await this.findOne(id);
        Object.assign(skill, updateSkillDto);
        return await this.skillRepository.save(skill);
    }
    async remove(id) {
        const skill = await this.findOne(id);
        await this.skillRepository.remove(skill);
    }
    async getSkillStats() {
        const [total, byCategory, byLevel] = await Promise.all([
            this.skillRepository.count(),
            this.getSkillsByCategory(),
            this.getSkillsByLevel(),
        ]);
        const expertSkills = await this.skillRepository.count({ where: { level: 4 } });
        const avgLevel = await this.skillRepository
            .createQueryBuilder('skill')
            .select('ROUND(AVG(skill.level), 1)', 'avgLevel')
            .getRawOne();
        return {
            total,
            expertSkills,
            averageLevel: parseFloat(avgLevel.avgLevel) || 0,
            byCategory,
            byLevel,
        };
    }
    async reorderSkills(category, skillOrders) {
        const skills = await this.skillRepository.find({ where: { category } });
        for (const skillOrder of skillOrders) {
            const skill = skills.find(s => s.id === skillOrder.id);
            if (skill) {
                skill.order = skillOrder.order;
                await this.skillRepository.save(skill);
            }
        }
    }
    async getSkillsByCategory() {
        const result = await this.skillRepository
            .createQueryBuilder('skill')
            .select('skill.category', 'category')
            .addSelect('COUNT(*)', 'count')
            .groupBy('skill.category')
            .getRawMany();
        return result.reduce((acc, item) => {
            acc[item.category] = parseInt(item.count);
            return acc;
        }, {});
    }
    async getSkillsByLevel() {
        const result = await this.skillRepository
            .createQueryBuilder('skill')
            .select('skill.level', 'level')
            .addSelect('COUNT(*)', 'count')
            .groupBy('skill.level')
            .orderBy('skill.level', 'ASC')
            .getRawMany();
        return result.reduce((acc, item) => {
            acc[`level${item.level}`] = parseInt(item.count);
            return acc;
        }, {});
    }
    applyFilters(queryBuilder, filters) {
        const { category, minLevel, search } = filters;
        if (category) {
            queryBuilder.andWhere('skill.category = :category', { category });
        }
        if (minLevel) {
            queryBuilder.andWhere('skill.level >= :minLevel', { minLevel });
        }
        if (search) {
            queryBuilder.andWhere('skill.name ILIKE :search', { search: `%${search}%` });
        }
    }
};
exports.SkillsService = SkillsService;
exports.SkillsService = SkillsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(skill_entity_1.Skill)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SkillsService);
//# sourceMappingURL=skills.service.js.map