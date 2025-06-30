import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, Max, IsBoolean, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryBlogPostDto {
    @ApiPropertyOptional({
        description: 'Search in title, excerpt, or content',
        example: 'NestJS'
    })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({
        description: 'Filter by specific tag',
        example: 'React'
    })
    @IsOptional()
    @IsString()
    tag?: string;

    @ApiPropertyOptional({
        description: 'Filter by published status',
        example: true
    })
    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    published?: boolean;

    @ApiPropertyOptional({
        description: 'Filter posts created after this date',
        example: '2024-01-01',
        type: 'string',
        format: 'date'
    })
    @IsOptional()
    @IsDateString()
    createdAfter?: string;

    @ApiPropertyOptional({
        description: 'Filter posts created before this date',
        example: '2024-12-31',
        type: 'string',
        format: 'date'
    })
    @IsOptional()
    @IsDateString()
    createdBefore?: string;

    @ApiPropertyOptional({
        description: 'Filter by minimum reading time',
        example: 5,
        minimum: 1
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    minReadingTime?: number;

    @ApiPropertyOptional({
        description: 'Filter by maximum reading time',
        example: 15,
        minimum: 1
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    maxReadingTime?: number;

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
        enum: ['createdAt', 'updatedAt', 'title', 'readTime'],
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

    @ApiPropertyOptional({
        description: 'Include content in response (false for listing)',
        example: false,
        default: false
    })
    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    includeContent?: boolean = false;
} 