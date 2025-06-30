import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, IsUrl, IsBoolean, IsEnum } from 'class-validator';
import { ProjectStatus } from '../../../entities/project.entity';

export class CreateProjectDto {
    @ApiProperty({
        description: 'Project title',
        example: 'Dark Tech Portfolio',
        maxLength: 100
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Short project description',
        example: 'Modern portfolio website with cyberpunk aesthetics'
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Detailed project description',
        example: 'A full-stack portfolio website built with React, NestJS, and PostgreSQL...',
        required: false
    })
    @IsOptional()
    @IsString()
    longDescription?: string;

    @ApiProperty({
        description: 'Technologies used in the project',
        example: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Docker'],
        type: [String]
    })
    @IsArray()
    @IsString({ each: true })
    technologies: string[];

    @ApiProperty({
        description: 'GitHub repository URL',
        example: 'https://github.com/berkay/dark-tech-portfolio',
        required: false
    })
    @IsOptional()
    @IsUrl()
    githubUrl?: string;

    @ApiProperty({
        description: 'Live demo URL',
        example: 'https://portfolio.berkay.dev',
        required: false
    })
    @IsOptional()
    @IsUrl()
    liveUrl?: string;

    @ApiProperty({
        description: 'Project image URL',
        example: 'https://example.com/project-image.jpg',
        required: false
    })
    @IsOptional()
    @IsUrl()
    imageUrl?: string;

    @ApiProperty({
        description: 'Whether the project is featured',
        example: true,
        default: false
    })
    @IsOptional()
    @IsBoolean()
    featured?: boolean;

    @ApiProperty({
        description: 'Project status',
        enum: ProjectStatus,
        example: ProjectStatus.COMPLETED,
        default: ProjectStatus.PLANNING
    })
    @IsOptional()
    @IsEnum(ProjectStatus)
    status?: ProjectStatus;
} 