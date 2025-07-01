import { SkillCategory } from '../../../entities/skill.entity';
export declare class CreateSkillDto {
    name: string;
    category: SkillCategory;
    level: number;
    icon?: string;
    color?: string;
    order?: number;
}
