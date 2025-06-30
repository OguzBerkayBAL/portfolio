import { IsOptional, IsString, IsBoolean, IsDateString, IsInt, Min, Max } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryResumeDto {
    @ApiPropertyOptional({ description: 'Search by version', example: 'v2024.1' })
    @IsOptional()
    @IsString()
    version?: string;

    @ApiPropertyOptional({ description: 'Filter by template style', example: 'cyberpunk' })
    @IsOptional()
    @IsString()
    template?: string;

    @ApiPropertyOptional({ description: 'Filter by active status', example: true })
    @IsOptional()
    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    isActive?: boolean;

    @ApiPropertyOptional({ description: 'Search in personal info', example: 'Berkay' })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({ description: 'Created after date', example: '2024-01-01' })
    @IsOptional()
    @IsDateString()
    createdAfter?: string;

    @ApiPropertyOptional({ description: 'Created before date', example: '2024-12-31' })
    @IsOptional()
    @IsDateString()
    createdBefore?: string;

    @ApiPropertyOptional({ description: 'Page number (1-based)', example: 1, minimum: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({ description: 'Items per page', example: 10, minimum: 1, maximum: 100 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 10;

    @ApiPropertyOptional({
        description: 'Sort field',
        example: 'createdAt',
        enum: ['id', 'version', 'template', 'createdAt', 'updatedAt']
    })
    @IsOptional()
    @IsString()
    sortBy?: string = 'createdAt';

    @ApiPropertyOptional({
        description: 'Sort order',
        example: 'DESC',
        enum: ['ASC', 'DESC']
    })
    @IsOptional()
    @IsString()
    sortOrder?: 'ASC' | 'DESC' = 'DESC';
} 