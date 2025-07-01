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
exports.SkillsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const skills_service_1 = require("./skills.service");
const create_skill_dto_1 = require("./dto/create-skill.dto");
const update_skill_dto_1 = require("./dto/update-skill.dto");
const query_skill_dto_1 = require("./dto/query-skill.dto");
const skill_entity_1 = require("../../entities/skill.entity");
let SkillsController = class SkillsController {
    skillsService;
    constructor(skillsService) {
        this.skillsService = skillsService;
    }
    async create(createSkillDto) {
        const skill = await this.skillsService.create(createSkillDto);
        return {
            success: true,
            message: `⚡ Skill "${skill.name}" uploaded to neural matrix!`,
            data: skill,
            terminal: {
                command: `skill.upload("${skill.name}", "${skill.category}")`,
                output: `> ${skill.name} integrated at level ${skill.level}`,
                status: 'NEURAL_UPLOAD_COMPLETE',
            },
        };
    }
    async findAll(queryDto) {
        const result = await this.skillsService.findAll(queryDto);
        return {
            success: true,
            message: `🔍 Neural scan complete: ${result.data.length} skills detected`,
            ...result,
            terminal: {
                command: 'neuralnet.scan(--skills --recursive)',
                output: `> ${result.total} skills in memory banks`,
                status: 'MATRIX_SCAN_COMPLETE',
            },
        };
    }
    async findByCategory(category) {
        const skills = await this.skillsService.findByCategory(category);
        return {
            success: true,
            message: `📂 ${category.toUpperCase()} neural pathway accessed: ${skills.length} skills found`,
            data: skills,
            terminal: {
                command: `neuralnet.filter(category="${category}")`,
                output: `> Accessing ${category} skill matrix...`,
                status: 'CATEGORY_FILTER_APPLIED',
            },
        };
    }
    async getStats() {
        const stats = await this.skillsService.getSkillStats();
        return {
            success: true,
            message: '📊 Neural matrix analysis complete',
            data: stats,
            terminal: {
                command: 'neuralnet.analyze(--full-matrix --generate-report)',
                output: `> ${stats.expertSkills} expert-level skills detected`,
                status: 'ANALYSIS_COMPLETE',
            },
        };
    }
    async findOne(id) {
        const skill = await this.skillsService.findOne(id);
        return {
            success: true,
            message: `🎯 Neural node "${skill.name}" accessed`,
            data: skill,
            terminal: {
                command: `neuralnet.access(node="${skill.id}")`,
                output: `> Skill data: ${skill.name} (${skill.category}) Level ${skill.level}`,
                status: 'NODE_ACCESS_GRANTED',
            },
        };
    }
    async update(id, updateSkillDto) {
        const skill = await this.skillsService.update(id, updateSkillDto);
        return {
            success: true,
            message: `🔧 Neural node "${skill.name}" parameters updated`,
            data: skill,
            terminal: {
                command: `neuralnet.modify(node="${skill.id}", params={...})`,
                output: `> Skill recalibrated to level ${skill.level}`,
                status: 'NODE_UPDATE_COMPLETE',
            },
        };
    }
    async remove(id) {
        await this.skillsService.remove(id);
        return {
            success: true,
            message: '🗑️ Neural node deleted from matrix',
            terminal: {
                command: `neuralnet.delete(node="${id}")`,
                output: `> Skill data permanently erased`,
                status: 'NODE_DELETION_COMPLETE',
            },
        };
    }
    async reorderSkills(category, skillOrders) {
        await this.skillsService.reorderSkills(category, skillOrders);
        return {
            success: true,
            message: `🔄 ${category.toUpperCase()} neural pathway reorganized`,
            terminal: {
                command: `neuralnet.reorder(category="${category}")`,
                output: `> ${skillOrders.length} nodes repositioned`,
                status: 'PATHWAY_REORDER_COMPLETE',
            },
        };
    }
};
exports.SkillsController = SkillsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: '⚡ Add New Skill',
        description: 'Upload a new technology skill to the neural matrix',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Skill successfully integrated into matrix',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid skill data provided',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_skill_dto_1.CreateSkillDto]),
    __metadata("design:returntype", Promise)
], SkillsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '🔍 List Technology Skills',
        description: 'Scan the neural matrix for available technology skills',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Skills retrieved from neural matrix',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_skill_dto_1.QuerySkillDto]),
    __metadata("design:returntype", Promise)
], SkillsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('category/:category'),
    (0, swagger_1.ApiOperation)({
        summary: '📂 Get Skills by Category',
        description: 'Retrieve skills from specific neural pathway',
    }),
    (0, swagger_1.ApiParam)({
        name: 'category',
        enum: skill_entity_1.SkillCategory,
        description: 'Skill category to scan',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Category skills retrieved successfully',
    }),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SkillsController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({
        summary: '📊 Neural Matrix Analytics',
        description: 'Analyze skill distribution and proficiency metrics',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Skill analytics compiled successfully',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SkillsController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '🎯 Get Skill Details',
        description: 'Deep scan specific skill node in neural matrix',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Skill node accessed successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Skill node not found in matrix',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SkillsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: '🔧 Update Skill Node',
        description: 'Modify skill parameters in neural matrix',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Skill node updated successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Skill node not found in matrix',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_skill_dto_1.UpdateSkillDto]),
    __metadata("design:returntype", Promise)
], SkillsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({
        summary: '🗑️ Delete Skill Node',
        description: 'Remove skill from neural matrix permanently',
    }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Skill node deleted from matrix',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Skill node not found in matrix',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SkillsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('reorder/:category'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: '🔄 Reorder Skills in Category',
        description: 'Reorganize skill nodes within neural pathway',
    }),
    (0, swagger_1.ApiParam)({
        name: 'category',
        enum: skill_entity_1.SkillCategory,
        description: 'Category to reorder',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Skills reordered successfully',
    }),
    __param(0, (0, common_1.Param)('category')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], SkillsController.prototype, "reorderSkills", null);
exports.SkillsController = SkillsController = __decorate([
    (0, swagger_1.ApiTags)('⚡ Skills'),
    (0, common_1.Controller)('skills'),
    __metadata("design:paramtypes", [skills_service_1.SkillsService])
], SkillsController);
//# sourceMappingURL=skills.controller.js.map