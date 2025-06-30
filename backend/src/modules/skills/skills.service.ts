import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Skill, SkillCategory } from '../../entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { QuerySkillDto } from './dto/query-skill.dto';

@Injectable()
export class SkillsService {
    constructor(
        @InjectRepository(Skill)
        private readonly skillRepository: Repository<Skill>,
    ) { }

    async create(createSkillDto: CreateSkillDto): Promise<Skill> {
        const skill = this.skillRepository.create(createSkillDto);
        return await this.skillRepository.save(skill);
    }

    async findAll(queryDto: QuerySkillDto) {
        const { page = 1, limit = 20, sortBy = 'category', sortOrder = 'ASC', ...filters } = queryDto;

        const queryBuilder = this.skillRepository.createQueryBuilder('skill');

        // Apply filters
        this.applyFilters(queryBuilder, filters);

        // Apply sorting with secondary sort by order
        if (sortBy === 'category') {
            queryBuilder.orderBy('skill.category', sortOrder);
            queryBuilder.addOrderBy('skill.order', 'ASC');
        } else {
            queryBuilder.orderBy(`skill.${sortBy}`, sortOrder);
        }

        // Apply pagination
        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);

        // Get results with count
        const [skills, total] = await queryBuilder.getManyAndCount();

        return {
            data: skills,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findByCategory(category: SkillCategory): Promise<Skill[]> {
        return await this.skillRepository.find({
            where: { category },
            order: { order: 'ASC', level: 'DESC' },
        });
    }

    async findOne(id: string): Promise<Skill> {
        const skill = await this.skillRepository.findOne({
            where: { id },
        });

        if (!skill) {
            throw new NotFoundException(`Skill with ID ${id} not found in the matrix`);
        }

        return skill;
    }

    async update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
        const skill = await this.findOne(id); // This will throw if not found

        // Update the skill
        Object.assign(skill, updateSkillDto);

        return await this.skillRepository.save(skill);
    }

    async remove(id: string): Promise<void> {
        const skill = await this.findOne(id); // This will throw if not found
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

    async reorderSkills(category: SkillCategory, skillOrders: { id: string; order: number }[]): Promise<void> {
        const skills = await this.skillRepository.find({ where: { category } });

        for (const skillOrder of skillOrders) {
            const skill = skills.find(s => s.id === skillOrder.id);
            if (skill) {
                skill.order = skillOrder.order;
                await this.skillRepository.save(skill);
            }
        }
    }

    private async getSkillsByCategory() {
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

    private async getSkillsByLevel() {
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

    private applyFilters(
        queryBuilder: SelectQueryBuilder<Skill>,
        filters: Partial<QuerySkillDto>,
    ) {
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
} 