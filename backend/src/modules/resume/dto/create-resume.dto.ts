import { IsString, IsOptional, IsBoolean, IsArray, ValidateNested, IsNotEmpty, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PersonalInfoDto {
    @ApiProperty({ description: 'Full name', example: 'Berkay Özkan' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @ApiProperty({ description: 'Professional title', example: 'Full Stack Developer' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    title: string;

    @ApiProperty({ description: 'Email address', example: 'berkay@example.com' })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'Phone number', example: '+90 555 123 4567' })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({ description: 'Location', example: 'Istanbul, Turkey' })
    @IsString()
    @IsNotEmpty()
    location: string;

    @ApiProperty({ description: 'Professional summary', example: 'Experienced full-stack developer...' })
    @IsString()
    @IsNotEmpty()
    summary: string;

    @ApiPropertyOptional({ description: 'Website URL', example: 'https://berkayozkan.dev' })
    @IsOptional()
    @IsString()
    website?: string;

    @ApiPropertyOptional({ description: 'LinkedIn profile', example: 'https://linkedin.com/in/berkayozkan' })
    @IsOptional()
    @IsString()
    linkedin?: string;

    @ApiPropertyOptional({ description: 'GitHub profile', example: 'https://github.com/berkayozkan' })
    @IsOptional()
    @IsString()
    github?: string;
}

export class EducationDto {
    @ApiProperty({ description: 'Degree/Education level', example: 'Bachelor of Computer Science' })
    @IsString()
    @IsNotEmpty()
    degree: string;

    @ApiProperty({ description: 'School/University name', example: 'Istanbul Technical University' })
    @IsString()
    @IsNotEmpty()
    school: string;

    @ApiProperty({ description: 'Graduation year', example: '2020' })
    @IsString()
    @IsNotEmpty()
    year: string;

    @ApiPropertyOptional({ description: 'GPA score', example: '3.8/4.0' })
    @IsOptional()
    @IsString()
    gpa?: string;

    @ApiPropertyOptional({ description: 'Additional description' })
    @IsOptional()
    @IsString()
    description?: string;
}

export class WorkExperienceDto {
    @ApiProperty({ description: 'Job title', example: 'Senior Full Stack Developer' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: 'Company name', example: 'Tech Solutions Inc.' })
    @IsString()
    @IsNotEmpty()
    company: string;

    @ApiProperty({ description: 'Work location', example: 'Istanbul, Turkey' })
    @IsString()
    @IsNotEmpty()
    location: string;

    @ApiProperty({ description: 'Start date', example: '2022-01' })
    @IsString()
    @IsNotEmpty()
    startDate: string;

    @ApiPropertyOptional({ description: 'End date (empty if current)', example: '2023-12' })
    @IsOptional()
    @IsString()
    endDate?: string;

    @ApiProperty({ description: 'Job description and responsibilities' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiPropertyOptional({ description: 'Technologies used' })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    technologies?: string[];

    @ApiPropertyOptional({ description: 'Key achievements' })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    achievements?: string[];
}

export class ResumeSkillDto {
    @ApiProperty({ description: 'Skill category', example: 'Frontend Development' })
    @IsString()
    @IsNotEmpty()
    category: string;

    @ApiProperty({ description: 'Skills in this category', example: ['React', 'TypeScript', 'Next.js'] })
    @IsArray()
    @IsString({ each: true })
    skills: string[];
}

export class ResumeProjectDto {
    @ApiProperty({ description: 'Project name', example: 'E-commerce Platform' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Project description' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'Technologies used', example: ['React', 'Node.js', 'PostgreSQL'] })
    @IsArray()
    @IsString({ each: true })
    technologies: string[];

    @ApiPropertyOptional({ description: 'Live demo URL' })
    @IsOptional()
    @IsString()
    url?: string;

    @ApiPropertyOptional({ description: 'GitHub repository URL' })
    @IsOptional()
    @IsString()
    github?: string;
}

export class LanguageDto {
    @ApiProperty({ description: 'Language name', example: 'English' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Proficiency level', example: 'Advanced' })
    @IsString()
    @IsNotEmpty()
    level: string;
}

export class CertificationDto {
    @ApiProperty({ description: 'Certification name', example: 'AWS Solutions Architect' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Issuing organization', example: 'Amazon Web Services' })
    @IsString()
    @IsNotEmpty()
    issuer: string;

    @ApiProperty({ description: 'Issue date', example: '2023-06' })
    @IsString()
    @IsNotEmpty()
    date: string;

    @ApiPropertyOptional({ description: 'Credential ID' })
    @IsOptional()
    @IsString()
    credentialId?: string;

    @ApiPropertyOptional({ description: 'Verification URL' })
    @IsOptional()
    @IsString()
    url?: string;
}

export class CreateResumeDto {
    @ApiProperty({ description: 'Resume version identifier', example: 'v2024.1' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    version: string;

    @ApiProperty({ description: 'Personal information', type: PersonalInfoDto })
    @ValidateNested()
    @Type(() => PersonalInfoDto)
    personalInfo: PersonalInfoDto;

    @ApiPropertyOptional({ description: 'Education background', type: [EducationDto] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => EducationDto)
    education?: EducationDto[];

    @ApiPropertyOptional({ description: 'Work experience', type: [WorkExperienceDto] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => WorkExperienceDto)
    experience?: WorkExperienceDto[];

    @ApiPropertyOptional({ description: 'Skills by category', type: [ResumeSkillDto] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ResumeSkillDto)
    skills?: ResumeSkillDto[];

    @ApiPropertyOptional({ description: 'Featured projects', type: [ResumeProjectDto] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ResumeProjectDto)
    projects?: ResumeProjectDto[];

    @ApiPropertyOptional({ description: 'Languages', type: [LanguageDto] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => LanguageDto)
    languages?: LanguageDto[];

    @ApiPropertyOptional({ description: 'Certifications', type: [CertificationDto] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CertificationDto)
    certifications?: CertificationDto[];

    @ApiPropertyOptional({ description: 'Whether this resume version is active', default: true })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @ApiPropertyOptional({ description: 'Custom sections as JSON string' })
    @IsOptional()
    @IsString()
    customSections?: string;

    @ApiPropertyOptional({ description: 'Resume template style', example: 'cyberpunk', enum: ['modern', 'classic', 'cyberpunk'] })
    @IsOptional()
    @IsString()
    template?: string;
} 