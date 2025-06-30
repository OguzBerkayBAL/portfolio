import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, IsDateString, IsBoolean } from 'class-validator';

export class CreateExperienceDto {
    @ApiProperty({
        description: 'Job title/position',
        example: 'Senior Full Stack Developer',
        maxLength: 100
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Company name',
        example: 'TechCorp Solutions',
        maxLength: 100
    })
    @IsString()
    company: string;

    @ApiProperty({
        description: 'Work location',
        example: 'Istanbul, Turkey',
        required: false,
        maxLength: 100
    })
    @IsOptional()
    @IsString()
    location?: string;

    @ApiProperty({
        description: 'Employment start date',
        example: '2022-01-15',
        type: 'string',
        format: 'date'
    })
    @IsDateString()
    startDate: string;

    @ApiProperty({
        description: 'Employment end date (null if current)',
        example: '2023-12-31',
        required: false,
        type: 'string',
        format: 'date'
    })
    @IsOptional()
    @IsDateString()
    endDate?: string;

    @ApiProperty({
        description: 'Whether this is current position',
        example: false,
        default: false
    })
    @IsOptional()
    @IsBoolean()
    current?: boolean;

    @ApiProperty({
        description: 'Job description and responsibilities',
        example: 'Leading development of enterprise web applications and mentoring junior developers...'
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Technologies used in this role',
        example: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Docker', 'AWS'],
        type: [String],
        required: false
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    technologies?: string[];

    @ApiProperty({
        description: 'Key achievements and accomplishments',
        example: [
            'Increased application performance by 40%',
            'Led team of 5 developers',
            'Implemented CI/CD pipeline'
        ],
        type: [String],
        required: false
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    achievements?: string[];
} 