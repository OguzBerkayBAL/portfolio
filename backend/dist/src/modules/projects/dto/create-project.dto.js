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
exports.CreateProjectDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const project_entity_1 = require("../../../entities/project.entity");
class CreateProjectDto {
    title;
    description;
    longDescription;
    technologies;
    githubUrl;
    liveUrl;
    imageUrl;
    featured;
    status;
}
exports.CreateProjectDto = CreateProjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Project title',
        example: 'Dark Tech Portfolio',
        maxLength: 100
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Short project description',
        example: 'Modern portfolio website with cyberpunk aesthetics'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detailed project description',
        example: 'A full-stack portfolio website built with React, NestJS, and PostgreSQL...',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "longDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Technologies used in the project',
        example: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Docker'],
        type: [String]
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateProjectDto.prototype, "technologies", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'GitHub repository URL',
        example: 'https://github.com/berkay/dark-tech-portfolio',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "githubUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Live demo URL',
        example: 'https://portfolio.berkay.dev',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "liveUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Project image URL',
        example: 'https://example.com/project-image.jpg',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the project is featured',
        example: true,
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateProjectDto.prototype, "featured", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Project status',
        enum: project_entity_1.ProjectStatus,
        example: project_entity_1.ProjectStatus.COMPLETED,
        default: project_entity_1.ProjectStatus.PLANNING
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(project_entity_1.ProjectStatus),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "status", void 0);
//# sourceMappingURL=create-project.dto.js.map