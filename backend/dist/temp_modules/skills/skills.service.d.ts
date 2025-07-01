import { Repository } from 'typeorm';
import { Skill, SkillCategory } from '../../entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { QuerySkillDto } from './dto/query-skill.dto';
export declare class SkillsService {
    private readonly skillRepository;
    constructor(skillRepository: Repository<Skill>);
    create(createSkillDto: CreateSkillDto): Promise<Skill>;
    findAll(queryDto: QuerySkillDto): Promise<{
        data: Skill[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findByCategory(category: SkillCategory): Promise<Skill[]>;
    findOne(id: string): Promise<Skill>;
    update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill>;
    remove(id: string): Promise<void>;
    getSkillStats(): Promise<{
        total: number;
        expertSkills: number;
        averageLevel: number;
        byCategory: any;
        byLevel: any;
    }>;
    reorderSkills(category: SkillCategory, skillOrders: {
        id: string;
        order: number;
    }[]): Promise<void>;
    private getSkillsByCategory;
    private getSkillsByLevel;
    private applyFilters;
}
