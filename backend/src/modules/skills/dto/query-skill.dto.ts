import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { SkillCategory } from '../../../entities/skill.entity';

export class QuerySkillDto {
    @ApiPropertyOptional({
        description: 'Filter by skill category',
        enum: SkillCategory,
        example: SkillCategory.FRONTEND
    })
    @IsOptional()
    @IsEnum(SkillCategory)
    category?: SkillCategory;

    @ApiPropertyOptional({
        description: 'Filter by minimum proficiency level',
        minimum: 1,
        maximum: 4,
        example: 3
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(4)
    @Type(() => Number)
    minLevel?: number;

    @ApiPropertyOptional({
        description: 'Search in skill names',
        example: 'React'
    })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({
        description: 'Page number for pagination',
        minimum: 1,
        default: 1
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page?: number = 1;

    @ApiPropertyOptional({
        description: 'Number of items per page',
        minimum: 1,
        maximum: 100,
        default: 20
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(100)
    @Type(() => Number)
    limit?: number = 20;

    @ApiPropertyOptional({
        description: 'Sort by field',
        enum: ['category', 'level', 'name', 'order'],
        default: 'category'
    })
    @IsOptional()
    @IsString()
    sortBy?: string = 'category';

    @ApiPropertyOptional({
        description: 'Sort order',
        enum: ['ASC', 'DESC'],
        default: 'ASC'
    })
    @IsOptional()
    @IsString()
    sortOrder?: 'ASC' | 'DESC' = 'ASC';
} 