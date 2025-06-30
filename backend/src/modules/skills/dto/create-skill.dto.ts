import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsInt, IsOptional, Min, Max, IsHexColor } from 'class-validator';
import { SkillCategory } from '../../../entities/skill.entity';

export class CreateSkillDto {
    @ApiProperty({
        description: 'Skill name',
        example: 'React',
        maxLength: 50
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Skill category',
        enum: SkillCategory,
        example: SkillCategory.FRONTEND
    })
    @IsEnum(SkillCategory)
    category: SkillCategory;

    @ApiProperty({
        description: 'Skill proficiency level (1-4)',
        example: 4,
        minimum: 1,
        maximum: 4
    })
    @IsInt()
    @Min(1)
    @Max(4)
    level: number;

    @ApiProperty({
        description: 'Icon identifier for the skill',
        example: 'react',
        required: false
    })
    @IsOptional()
    @IsString()
    icon?: string;

    @ApiProperty({
        description: 'Hex color code for the skill',
        example: '#61DAFB',
        required: false
    })
    @IsOptional()
    @IsHexColor()
    color?: string;

    @ApiProperty({
        description: 'Display order for sorting',
        example: 1,
        required: false,
        default: 0
    })
    @IsOptional()
    @IsInt()
    @Min(0)
    order?: number;
} 