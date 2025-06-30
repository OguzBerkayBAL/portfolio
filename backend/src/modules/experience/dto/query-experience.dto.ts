import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, Max, IsBoolean, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryExperienceDto {
    @ApiPropertyOptional({
        description: 'Filter by company name',
        example: 'TechCorp'
    })
    @IsOptional()
    @IsString()
    company?: string;

    @ApiPropertyOptional({
        description: 'Filter by technology used',
        example: 'React'
    })
    @IsOptional()
    @IsString()
    technology?: string;

    @ApiPropertyOptional({
        description: 'Filter by current position',
        example: true
    })
    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    current?: boolean;

    @ApiPropertyOptional({
        description: 'Search in title, company, or description',
        example: 'developer'
    })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({
        description: 'Filter experiences after this date',
        example: '2020-01-01',
        type: 'string',
        format: 'date'
    })
    @IsOptional()
    @IsDateString()
    startDateAfter?: string;

    @ApiPropertyOptional({
        description: 'Filter experiences before this date',
        example: '2023-12-31',
        type: 'string',
        format: 'date'
    })
    @IsOptional()
    @IsDateString()
    startDateBefore?: string;

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
        maximum: 50,
        default: 10
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(50)
    @Type(() => Number)
    limit?: number = 10;

    @ApiPropertyOptional({
        description: 'Sort by field',
        enum: ['startDate', 'endDate', 'company', 'title'],
        default: 'startDate'
    })
    @IsOptional()
    @IsString()
    sortBy?: string = 'startDate';

    @ApiPropertyOptional({
        description: 'Sort order',
        enum: ['ASC', 'DESC'],
        default: 'DESC'
    })
    @IsOptional()
    @IsString()
    sortOrder?: 'ASC' | 'DESC' = 'DESC';
} 