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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const projects_service_1 = require("./projects.service");
const create_project_dto_1 = require("./dto/create-project.dto");
const update_project_dto_1 = require("./dto/update-project.dto");
const query_project_dto_1 = require("./dto/query-project.dto");
let ProjectsController = class ProjectsController {
    projectsService;
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    async create(createProjectDto) {
        const project = await this.projectsService.create(createProjectDto);
        return {
            success: true,
            message: '🚀 Project added to the matrix successfully!',
            data: project,
            terminal: {
                command: `project.create("${project.title}")`,
                output: `> Project "${project.title}" deployed to portfolio matrix`,
                status: 'OPERATION_SUCCESSFUL',
            },
        };
    }
    async findAll(queryDto) {
        const result = await this.projectsService.findAll(queryDto);
        return {
            success: true,
            message: `📁 Retrieved ${result.data.length} projects from the portfolio matrix`,
            ...result,
            terminal: {
                command: 'ls -la projects/',
                output: `total ${result.total} projects found`,
                status: 'MATRIX_SCAN_COMPLETE',
            },
        };
    }
    async findFeatured() {
        const projects = await this.projectsService.findFeatured();
        return {
            success: true,
            message: `⭐ ${projects.length} elite projects loaded from featured archive`,
            data: projects,
            terminal: {
                command: 'grep -r "featured:true" projects/',
                output: `> ${projects.length} featured projects in archive`,
                status: 'ELITE_MODE_ACTIVE',
            },
        };
    }
    async getStats() {
        const stats = await this.projectsService.getProjectStats();
        return {
            success: true,
            message: '📊 Portfolio matrix statistics compiled',
            data: stats,
            terminal: {
                command: 'analyze --portfolio-matrix --generate-stats',
                output: `> ${stats.completionRate}% completion rate detected`,
                status: 'ANALYSIS_COMPLETE',
            },
        };
    }
    async findOne(id) {
        const project = await this.projectsService.findOne(id);
        return {
            success: true,
            message: `🔍 Project "${project.title}" located in matrix`,
            data: project,
            terminal: {
                command: `cat projects/${project.title}.json`,
                output: `> Project details loaded from archive`,
                status: 'FILE_ACCESS_GRANTED',
            },
        };
    }
    async update(id, updateProjectDto) {
        const project = await this.projectsService.update(id, updateProjectDto);
        return {
            success: true,
            message: `⚡ Project "${project.title}" successfully updated in matrix`,
            data: project,
            terminal: {
                command: `nano projects/${project.title}.json`,
                output: `> File modified. Changes committed to matrix.`,
                status: 'UPDATE_SUCCESSFUL',
            },
        };
    }
    async remove(id) {
        await this.projectsService.remove(id);
        return {
            success: true,
            message: '🗑️ Project deleted from matrix permanently',
            terminal: {
                command: `rm -rf projects/${id}`,
                output: `> Project data wiped from archive`,
                status: 'DELETION_COMPLETE',
            },
        };
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: '🚀 Create New Project',
        description: 'Create a new portfolio project entry with cyberpunk flair',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Project successfully created',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid project data provided',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '📋 List All Projects',
        description: 'Retrieve portfolio projects with advanced filtering and cyberpunk sorting',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Projects retrieved successfully',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_project_dto_1.QueryProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('featured'),
    (0, swagger_1.ApiOperation)({
        summary: '⭐ Get Featured Projects',
        description: 'Retrieve only the most elite projects from the matrix',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Featured projects retrieved successfully',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findFeatured", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({
        summary: '📊 Project Statistics',
        description: 'Get cyberpunk-style project statistics and metrics',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Project statistics retrieved successfully',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '🔍 Get Project Details',
        description: 'Retrieve detailed information about a specific project from the matrix',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Project details retrieved successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Project not found in the matrix',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: '⚡ Update Project',
        description: 'Modify project data in the portfolio matrix',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Project updated successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Project not found in matrix',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({
        summary: '🗑️ Delete Project',
        description: 'Remove project from the portfolio matrix permanently',
    }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Project successfully deleted from matrix',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Project not found in matrix',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "remove", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, swagger_1.ApiTags)('📁 Projects'),
    (0, common_1.Controller)('projects'),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map