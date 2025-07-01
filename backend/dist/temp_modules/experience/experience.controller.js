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
exports.ExperienceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const experience_service_1 = require("./experience.service");
const create_experience_dto_1 = require("./dto/create-experience.dto");
const update_experience_dto_1 = require("./dto/update-experience.dto");
const query_experience_dto_1 = require("./dto/query-experience.dto");
let ExperienceController = class ExperienceController {
    experienceService;
    constructor(experienceService) {
        this.experienceService = experienceService;
    }
    async create(createExperienceDto) {
        const experience = await this.experienceService.create(createExperienceDto);
        return {
            success: true,
            message: `💼 Experience at "${experience.company}" added to career matrix!`,
            data: experience,
            terminal: {
                command: `career.upload("${experience.title}", "${experience.company}")`,
                output: `> Professional node integrated: ${experience.company}`,
                status: 'CAREER_NODE_CREATED',
            },
        };
    }
    async findAll(queryDto) {
        const result = await this.experienceService.findAll(queryDto);
        return {
            success: true,
            message: `📋 Career scan complete: ${result.data.length} positions detected`,
            ...result,
            terminal: {
                command: 'career.scan(--timeline --full-history)',
                output: `> ${result.total} professional nodes in memory`,
                status: 'CAREER_SCAN_COMPLETE',
            },
        };
    }
    async getTimeline() {
        const timeline = await this.experienceService.getCareerTimeline();
        return {
            success: true,
            message: `📅 Professional timeline compiled: ${timeline.length} career milestones`,
            data: timeline,
            terminal: {
                command: 'career.timeline(--chronological --full-data)',
                output: `> Timeline spans ${timeline.length} professional positions`,
                status: 'TIMELINE_COMPILED',
            },
        };
    }
    async getCurrent() {
        const current = await this.experienceService.findCurrent();
        return {
            success: true,
            message: `⚡ Active career nodes detected: ${current.length} current position(s)`,
            data: current,
            terminal: {
                command: 'career.filter(status="active")',
                output: `> ${current.length} active professional engagement(s)`,
                status: 'ACTIVE_NODES_LOCATED',
            },
        };
    }
    async getStats() {
        const stats = await this.experienceService.getCareerStats();
        return {
            success: true,
            message: '📊 Career matrix analysis complete',
            data: stats,
            terminal: {
                command: 'career.analyze(--deep-scan --tech-matrix)',
                output: `> ${stats.totalYears} years of experience across ${stats.companiesCount} organizations`,
                status: 'CAREER_ANALYSIS_COMPLETE',
            },
        };
    }
    async findOne(id) {
        const experience = await this.experienceService.findOne(id);
        return {
            success: true,
            message: `🎯 Career node "${experience.title}" at ${experience.company} accessed`,
            data: experience,
            terminal: {
                command: `career.access(node="${experience.id}")`,
                output: `> Displaying ${experience.title} details from ${experience.company}`,
                status: 'NODE_ACCESS_GRANTED',
            },
        };
    }
    async update(id, updateExperienceDto) {
        const experience = await this.experienceService.update(id, updateExperienceDto);
        return {
            success: true,
            message: `🔧 Career node "${experience.title}" at ${experience.company} updated`,
            data: experience,
            terminal: {
                command: `career.modify(node="${experience.id}", data={...})`,
                output: `> Professional data recalibrated for ${experience.company}`,
                status: 'NODE_UPDATE_COMPLETE',
            },
        };
    }
    async remove(id) {
        await this.experienceService.remove(id);
        return {
            success: true,
            message: '🗑️ Career node deleted from professional matrix',
            terminal: {
                command: `career.delete(node="${id}")`,
                output: `> Experience data permanently archived`,
                status: 'NODE_DELETION_COMPLETE',
            },
        };
    }
};
exports.ExperienceController = ExperienceController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: '💼 Add Career Node',
        description: 'Upload new professional experience to career matrix',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Experience node successfully integrated',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid experience data provided',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_experience_dto_1.CreateExperienceDto]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '📋 List Career History',
        description: 'Scan professional timeline from career matrix',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Career history retrieved successfully',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_experience_dto_1.QueryExperienceDto]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('timeline'),
    (0, swagger_1.ApiOperation)({
        summary: '📅 Get Career Timeline',
        description: 'Retrieve complete professional journey chronologically',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Career timeline compiled successfully',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "getTimeline", null);
__decorate([
    (0, common_1.Get)('current'),
    (0, swagger_1.ApiOperation)({
        summary: '⚡ Get Current Positions',
        description: 'Access active professional engagements',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Current positions retrieved successfully',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "getCurrent", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({
        summary: '📊 Career Matrix Analytics',
        description: 'Analyze professional growth and technology exposure',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Career analytics compiled successfully',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '🎯 Get Experience Details',
        description: 'Deep scan specific career node for detailed analysis',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Experience node accessed successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Experience node not found in career matrix',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: '🔧 Update Career Node',
        description: 'Modify professional experience data in career matrix',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Experience node updated successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Experience node not found in career matrix',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_experience_dto_1.UpdateExperienceDto]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({
        summary: '🗑️ Delete Career Node',
        description: 'Remove professional experience from career matrix',
    }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Experience node deleted from career matrix',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Experience node not found in career matrix',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "remove", null);
exports.ExperienceController = ExperienceController = __decorate([
    (0, swagger_1.ApiTags)('💼 Experience'),
    (0, common_1.Controller)('experience'),
    __metadata("design:paramtypes", [experience_service_1.ExperienceService])
], ExperienceController);
//# sourceMappingURL=experience.controller.js.map