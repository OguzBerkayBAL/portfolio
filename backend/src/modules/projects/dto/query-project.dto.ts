import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsBoolean, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ProjectStatus } from '../../../entities/project.entity';

export class QueryProjectDto {
    @ApiPropertyOptional({
        description: 'Filter by project status',
        enum: ProjectStatus,
        example: ProjectStatus.COMPLETED
    })
    @IsOptional()
    @IsEnum(ProjectStatus)
    status?: ProjectStatus;

    @ApiPropertyOptional({
        description: 'Filter by featured projects only',
        example: true
    })
    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    featured?: boolean;

    @ApiPropertyOptional({
        description: 'Search in project title and description',
        example: 'React'
    })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({
        description: 'Filter by technology',
        example: 'React'
    })
    @IsOptional()
    @IsString()
    technology?: string;

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
        default: 10
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(100)
    @Type(() => Number)
    limit?: number = 10;

    @ApiPropertyOptional({
        description: 'Sort by field',
        enum: ['createdAt', 'updatedAt', 'title'],
        default: 'createdAt'
    })
    @IsOptional()
    @IsString()
    sortBy?: string = 'createdAt';

    @ApiPropertyOptional({
        description: 'Sort order',
        enum: ['ASC', 'DESC'],
        default: 'DESC'
    })
    @IsOptional()
    @IsString()
    sortOrder?: 'ASC' | 'DESC' = 'DESC';
} 