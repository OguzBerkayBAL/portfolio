import { SkillCategory } from '../../../entities/skill.entity';
export declare class QuerySkillDto {
    category?: SkillCategory;
    minLevel?: number;
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
}
