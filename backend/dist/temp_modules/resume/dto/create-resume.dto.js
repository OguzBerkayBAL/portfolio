"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResumeDto = exports.CertificationDto = exports.LanguageDto = exports.ResumeProjectDto = exports.ResumeSkillDto = exports.WorkExperienceDto = exports.EducationDto = exports.PersonalInfoDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class PersonalInfoDto {
    name;
    title;
    email;
    phone;
    location;
    summary;
    website;
    linkedin;
    github;
}
exports.PersonalInfoDto = PersonalInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Full name', example: 'Berkay Özkan' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], PersonalInfoDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Professional title', example: 'Full Stack Developer' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], PersonalInfoDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email address', example: 'berkay@example.com' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PersonalInfoDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Phone number', example: '+90 555 123 4567' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PersonalInfoDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Location', example: 'Istanbul, Turkey' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PersonalInfoDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Professional summary', example: 'Experienced full-stack developer...' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PersonalInfoDto.prototype, "summary", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Website URL', example: 'https://berkayozkan.dev' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PersonalInfoDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'LinkedIn profile', example: 'https://linkedin.com/in/berkayozkan' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PersonalInfoDto.prototype, "linkedin", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'GitHub profile', example: 'https://github.com/berkayozkan' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PersonalInfoDto.prototype, "github", void 0);
class EducationDto {
    degree;
    school;
    year;
    gpa;
    description;
}
exports.EducationDto = EducationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Degree/Education level', example: 'Bachelor of Computer Science' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EducationDto.prototype, "degree", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'School/University name', example: 'Istanbul Technical University' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EducationDto.prototype, "school", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Graduation year', example: '2020' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EducationDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'GPA score', example: '3.8/4.0' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EducationDto.prototype, "gpa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Additional description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EducationDto.prototype, "description", void 0);
class WorkExperienceDto {
    title;
    company;
    location;
    startDate;
    endDate;
    description;
    technologies;
    achievements;
}
exports.WorkExperienceDto = WorkExperienceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Job title', example: 'Senior Full Stack Developer' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], WorkExperienceDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Company name', example: 'Tech Solutions Inc.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], WorkExperienceDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Work location', example: 'Istanbul, Turkey' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], WorkExperienceDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Start date', example: '2022-01' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], WorkExperienceDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'End date (empty if current)', example: '2023-12' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WorkExperienceDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Job description and responsibilities' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], WorkExperienceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Technologies used' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], WorkExperienceDto.prototype, "technologies", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Key achievements' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], WorkExperienceDto.prototype, "achievements", void 0);
class ResumeSkillDto {
    category;
    skills;
}
exports.ResumeSkillDto = ResumeSkillDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Skill category', example: 'Frontend Development' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ResumeSkillDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Skills in this category', example: ['React', 'TypeScript', 'Next.js'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ResumeSkillDto.prototype, "skills", void 0);
class ResumeProjectDto {
    name;
    description;
    technologies;
    url;
    github;
}
exports.ResumeProjectDto = ResumeProjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project name', example: 'E-commerce Platform' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ResumeProjectDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project description' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ResumeProjectDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Technologies used', example: ['React', 'Node.js', 'PostgreSQL'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ResumeProjectDto.prototype, "technologies", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Live demo URL' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResumeProjectDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'GitHub repository URL' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResumeProjectDto.prototype, "github", void 0);
class LanguageDto {
    name;
    level;
}
exports.LanguageDto = LanguageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Language name', example: 'English' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LanguageDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Proficiency level', example: 'Advanced' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LanguageDto.prototype, "level", void 0);
class CertificationDto {
    name;
    issuer;
    date;
    credentialId;
    url;
}
exports.CertificationDto = CertificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Certification name', example: 'AWS Solutions Architect' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CertificationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Issuing organization', example: 'Amazon Web Services' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CertificationDto.prototype, "issuer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Issue date', example: '2023-06' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CertificationDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Credential ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CertificationDto.prototype, "credentialId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Verification URL' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CertificationDto.prototype, "url", void 0);
class CreateResumeDto {
    version;
    personalInfo;
    education;
    experience;
    skills;
    projects;
    languages;
    certifications;
    isActive;
    customSections;
    template;
}
exports.CreateResumeDto = CreateResumeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Resume version identifier', example: 'v2024.1' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateResumeDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Personal information', type: PersonalInfoDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PersonalInfoDto),
    __metadata("design:type", PersonalInfoDto)
], CreateResumeDto.prototype, "personalInfo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Education background', type: [EducationDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => EducationDto),
    __metadata("design:type", Array)
], CreateResumeDto.prototype, "education", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Work experience', type: [WorkExperienceDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => WorkExperienceDto),
    __metadata("design:type", Array)
], CreateResumeDto.prototype, "experience", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Skills by category', type: [ResumeSkillDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ResumeSkillDto),
    __metadata("design:type", Array)
], CreateResumeDto.prototype, "skills", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Featured projects', type: [ResumeProjectDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ResumeProjectDto),
    __metadata("design:type", Array)
], CreateResumeDto.prototype, "projects", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Languages', type: [LanguageDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => LanguageDto),
    __metadata("design:type", Array)
], CreateResumeDto.prototype, "languages", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Certifications', type: [CertificationDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CertificationDto),
    __metadata("design:type", Array)
], CreateResumeDto.prototype, "certifications", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether this resume version is active', default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateResumeDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Custom sections as JSON string' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResumeDto.prototype, "customSections", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Resume template style', example: 'cyberpunk', enum: ['modern', 'classic', 'cyberpunk'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResumeDto.prototype, "template", void 0);
//# sourceMappingURL=create-resume.dto.js.map