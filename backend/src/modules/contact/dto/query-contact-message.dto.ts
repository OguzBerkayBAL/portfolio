import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsDateString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { MessageStatus } from '../../../entities/contact-message.entity';

export class QueryContactMessageDto {
    @ApiPropertyOptional({
        description: 'Search in name, email, subject, or message content',
        example: 'collaboration'
    })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({
        description: 'Filter by message status',
        enum: MessageStatus
    })
    @IsOptional()
    @IsEnum(MessageStatus)
    status?: MessageStatus;

    @ApiPropertyOptional({
        description: 'Filter by sender email',
        example: 'berkay@darktech.dev'
    })
    @IsOptional()
    @IsString()
    email?: string;

    @ApiPropertyOptional({
        description: 'Filter messages created after this date',
        example: '2025-06-01T00:00:00Z'
    })
    @IsOptional()
    @IsDateString()
    createdAfter?: string;

    @ApiPropertyOptional({
        description: 'Filter messages created before this date',
        example: '2025-06-30T23:59:59Z'
    })
    @IsOptional()
    @IsDateString()
    createdBefore?: string;

    @ApiPropertyOptional({
        description: 'Page number for pagination',
        default: 1,
        minimum: 1
    })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({
        description: 'Number of items per page',
        default: 10,
        minimum: 1,
        maximum: 100
    })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    @Min(1)
    limit?: number = 10;

    @ApiPropertyOptional({
        description: 'Sort by field',
        enum: ['createdAt', 'name', 'email', 'status'],
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