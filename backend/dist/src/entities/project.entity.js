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
exports.Project = exports.ProjectStatus = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["PLANNING"] = "planning";
    ProjectStatus["IN_PROGRESS"] = "in_progress";
    ProjectStatus["COMPLETED"] = "completed";
    ProjectStatus["ARCHIVED"] = "archived";
})(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
let Project = class Project {
    id;
    title;
    description;
    longDescription;
    technologies;
    githubUrl;
    liveUrl;
    imageUrl;
    featured;
    status;
    createdAt;
    updatedAt;
};
exports.Project = Project;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Project.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project title', maxLength: 100 }),
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Project.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Short project description' }),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Detailed project description', required: false }),
    (0, typeorm_1.Column)('text', { nullable: true, name: 'long_description' }),
    __metadata("design:type", String)
], Project.prototype, "longDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Technologies used in the project', type: [String] }),
    (0, typeorm_1.Column)('text', { array: true }),
    __metadata("design:type", Array)
], Project.prototype, "technologies", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'GitHub repository URL', required: false }),
    (0, typeorm_1.Column)({ nullable: true, name: 'github_url' }),
    __metadata("design:type", String)
], Project.prototype, "githubUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Live demo URL', required: false }),
    (0, typeorm_1.Column)({ nullable: true, name: 'live_url' }),
    __metadata("design:type", String)
], Project.prototype, "liveUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project image URL', required: false }),
    (0, typeorm_1.Column)({ nullable: true, name: 'image_url' }),
    __metadata("design:type", String)
], Project.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the project is featured' }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Project.prototype, "featured", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project status', enum: ProjectStatus }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProjectStatus,
        default: ProjectStatus.PLANNING,
    }),
    __metadata("design:type", String)
], Project.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation timestamp' }),
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Project.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last update timestamp' }),
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Project.prototype, "updatedAt", void 0);
exports.Project = Project = __decorate([
    (0, typeorm_1.Entity)('projects'),
    (0, typeorm_1.Index)(['featured', 'status'])
], Project);
//# sourceMappingURL=project.entity.js.map