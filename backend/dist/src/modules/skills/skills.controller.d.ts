import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { QuerySkillDto } from './dto/query-skill.dto';
import { SkillCategory } from '../../entities/skill.entity';
export declare class SkillsController {
    private readonly skillsService;
    constructor(skillsService: SkillsService);
    create(createSkillDto: CreateSkillDto): Promise<{
        success: boolean;
        message: string;
        data: import("../../entities/skill.entity").Skill;
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    findAll(queryDto: QuerySkillDto): Promise<{
        terminal: {
            command: string;
            output: string;
            status: string;
        };
        data: import("../../entities/skill.entity").Skill[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        success: boolean;
        message: string;
    }>;
    findByCategory(category: SkillCategory): Promise<{
        success: boolean;
        message: string;
        data: import("../../entities/skill.entity").Skill[];
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    getStats(): Promise<{
        success: boolean;
        message: string;
        data: {
            total: number;
            expertSkills: number;
            averageLevel: number;
            byCategory: any;
            byLevel: any;
        };
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: import("../../entities/skill.entity").Skill;
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    update(id: string, updateSkillDto: UpdateSkillDto): Promise<{
        success: boolean;
        message: string;
        data: import("../../entities/skill.entity").Skill;
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    reorderSkills(category: SkillCategory, skillOrders: {
        id: string;
        order: number;
    }[]): Promise<{
        success: boolean;
        message: string;
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
}
