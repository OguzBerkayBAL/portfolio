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
exports.ResumeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const resume_service_1 = require("./resume.service");
const create_resume_dto_1 = require("./dto/create-resume.dto");
const update_resume_dto_1 = require("./dto/update-resume.dto");
const query_resume_dto_1 = require("./dto/query-resume.dto");
let ResumeController = class ResumeController {
    resumeService;
    constructor(resumeService) {
        this.resumeService = resumeService;
    }
    async create(createResumeDto) {
        const resume = await this.resumeService.create(createResumeDto);
        return {
            success: true,
            message: `📄 Resume ${resume.version} created successfully`,
            data: resume,
            timestamp: new Date().toISOString(),
            system: {
                status: 'OPERATIONAL',
                version: 'v1.0.0',
                module: 'RESUME_ENGINE'
            }
        };
    }
    async findAll(queryDto) {
        const result = await this.resumeService.findAll(queryDto);
        return {
            success: true,
            message: `📋 Retrieved ${result.data.length} resume versions`,
            data: result.data,
            pagination: {
                total: result.total,
                page: result.page,
                limit: result.limit,
                totalPages: result.totalPages
            },
            timestamp: new Date().toISOString(),
            system: {
                status: 'OPERATIONAL',
                query_time: '0.045s'
            }
        };
    }
    async findActive() {
        const resume = await this.resumeService.findActive();
        return {
            success: true,
            message: '🎯 Active resume retrieved',
            data: resume,
            timestamp: new Date().toISOString(),
            system: {
                status: 'ACTIVE',
                version: resume.version
            }
        };
    }
    async getStats() {
        const stats = await this.resumeService.getStats();
        return {
            success: true,
            message: '📊 Resume statistics compiled',
            data: stats,
            timestamp: new Date().toISOString(),
            system: {
                status: 'OPERATIONAL',
                total_versions: stats.total,
                active_version: stats.active > 0 ? 'DEPLOYED' : 'NO_ACTIVE'
            }
        };
    }
    async findByVersion(version) {
        const resume = await this.resumeService.findByVersion(version);
        return {
            success: true,
            message: `🔍 Resume version ${version} retrieved`,
            data: resume,
            timestamp: new Date().toISOString(),
            system: {
                status: 'FOUND',
                version: resume.version,
                template: resume.template
            }
        };
    }
    async findOne(id) {
        const resume = await this.resumeService.findOne(id);
        return {
            success: true,
            message: `📄 Resume #${id} retrieved`,
            data: resume,
            timestamp: new Date().toISOString(),
            system: {
                status: 'FOUND',
                id: resume.id,
                version: resume.version
            }
        };
    }
    async downloadPDF(id, template = 'modern', res) {
        const resume = await this.resumeService.findOne(id);
        const pdfBuffer = await this.resumeService.generatePDF(id, template);
        const filename = `${resume.personalInfo.name.replace(/\s+/g, '_')}_Resume_${resume.version}_${template}.pdf`;
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${filename}"`,
            'Content-Length': pdfBuffer.length,
            'X-Resume-Version': resume.version,
            'X-Template': template,
            'X-Generated': new Date().toISOString()
        });
        res.send(pdfBuffer);
    }
    async update(id, updateResumeDto) {
        const resume = await this.resumeService.update(id, updateResumeDto);
        return {
            success: true,
            message: `✏️ Resume #${id} updated successfully`,
            data: resume,
            timestamp: new Date().toISOString(),
            system: {
                status: 'UPDATED',
                version: resume.version,
                last_modified: resume.updatedAt
            }
        };
    }
    async setActive(id) {
        const resume = await this.resumeService.setActive(id);
        return {
            success: true,
            message: `🎯 Resume #${id} (${resume.version}) is now active`,
            data: resume,
            timestamp: new Date().toISOString(),
            system: {
                status: 'ACTIVATED',
                active_version: resume.version,
                deployment_status: 'LIVE'
            }
        };
    }
    async remove(id) {
        await this.resumeService.remove(id);
        return {
            success: true,
            message: `🗑️ Resume #${id} deleted successfully`,
            timestamp: new Date().toISOString(),
            system: {
                status: 'DELETED',
                operation: 'PERMANENT_REMOVAL'
            }
        };
    }
};
exports.ResumeController = ResumeController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: '📄 Create Resume Version',
        description: 'Initialize new resume version in the system'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '✅ Resume version created successfully',
        schema: {
            example: {
                success: true,
                message: '📄 Resume v2024.1 created successfully',
                data: {
                    id: 1,
                    version: 'v2024.1',
                    personalInfo: {
                        name: 'Berkay Özkan',
                        title: 'Full Stack Developer'
                    },
                    template: 'cyberpunk',
                    isActive: true
                },
                timestamp: '2024-01-15T10:30:00.000Z',
                system: {
                    status: 'OPERATIONAL',
                    version: 'v1.0.0'
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: '⚠️ Resume version already exists',
        schema: {
            example: {
                success: false,
                error: 'CONFLICT',
                message: '⚠️ Resume version already exists',
                timestamp: '2024-01-15T10:30:00.000Z'
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_resume_dto_1.CreateResumeDto]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '📋 List Resume Versions',
        description: 'Retrieve all resume versions with filtering and pagination'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '✅ Resume versions retrieved successfully',
        schema: {
            example: {
                success: true,
                message: '📋 Retrieved 2 resume versions',
                data: [
                    {
                        id: 1,
                        version: 'v2024.1',
                        template: 'cyberpunk',
                        isActive: true,
                        createdAt: '2024-01-15T10:30:00.000Z'
                    }
                ],
                pagination: {
                    total: 2,
                    page: 1,
                    limit: 10,
                    totalPages: 1
                },
                timestamp: '2024-01-15T10:30:00.000Z'
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_resume_dto_1.QueryResumeDto]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({
        summary: '🎯 Get Active Resume',
        description: 'Retrieve the currently active resume version'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '✅ Active resume retrieved successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: '❌ No active resume found'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "findActive", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({
        summary: '📊 Resume Statistics',
        description: 'Get comprehensive statistics about resume versions'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '✅ Statistics retrieved successfully',
        schema: {
            example: {
                success: true,
                message: '📊 Resume statistics compiled',
                data: {
                    total: 5,
                    active: 1,
                    byTemplate: {
                        'modern': 2,
                        'cyberpunk': 2,
                        'classic': 1
                    },
                    recentCount: 3
                },
                timestamp: '2024-01-15T10:30:00.000Z'
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('version/:version'),
    (0, swagger_1.ApiOperation)({
        summary: '🔍 Get Resume by Version',
        description: 'Retrieve specific resume version'
    }),
    (0, swagger_1.ApiParam)({ name: 'version', description: 'Resume version identifier', example: 'v2024.1' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '✅ Resume version found'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: '❌ Resume version not found'
    }),
    __param(0, (0, common_1.Param)('version')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "findByVersion", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '📄 Get Resume by ID',
        description: 'Retrieve specific resume by database ID'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Resume database ID', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '✅ Resume found successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: '❌ Resume not found'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/pdf'),
    (0, swagger_1.ApiOperation)({
        summary: '📁 Generate & Download PDF',
        description: 'Generate PDF version of resume and download'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Resume database ID', example: 1 }),
    (0, swagger_1.ApiQuery)({
        name: 'template',
        required: false,
        description: 'PDF template style',
        example: 'cyberpunk',
        enum: ['modern', 'classic', 'cyberpunk']
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '✅ PDF generated and downloaded',
        headers: {
            'Content-Type': { description: 'application/pdf' },
            'Content-Disposition': { description: 'attachment; filename="resume.pdf"' }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: '❌ Resume not found'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('template')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "downloadPDF", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '✏️ Update Resume Version',
        description: 'Modify existing resume version data'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Resume database ID', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '✅ Resume updated successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: '❌ Resume not found'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_resume_dto_1.UpdateResumeDto]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/activate'),
    (0, swagger_1.ApiOperation)({
        summary: '🎯 Activate Resume Version',
        description: 'Set specific resume version as active (deactivates others)'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Resume database ID', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '✅ Resume activated successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: '❌ Resume not found'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "setActive", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '🗑️ Delete Resume Version',
        description: 'Permanently delete resume version from system'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Resume database ID', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '✅ Resume deleted successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: '❌ Resume not found'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "remove", null);
exports.ResumeController = ResumeController = __decorate([
    (0, swagger_1.ApiTags)('💼 Resume System'),
    (0, common_1.Controller)('resumes'),
    __metadata("design:paramtypes", [resume_service_1.ResumeService])
], ResumeController);
//# sourceMappingURL=resume.controller.js.map