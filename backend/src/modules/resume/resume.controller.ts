import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    Res,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { QueryResumeDto } from './dto/query-resume.dto';

@ApiTags('💼 Resume System')
@Controller('resumes')
export class ResumeController {
    constructor(private readonly resumeService: ResumeService) { }

    @Post()
    @ApiOperation({
        summary: '📄 Create Resume Version',
        description: 'Initialize new resume version in the system'
    })
    @ApiResponse({
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
    })
    @ApiResponse({
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
    })
    async create(@Body() createResumeDto: CreateResumeDto) {
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

    @Get()
    @ApiOperation({
        summary: '📋 List Resume Versions',
        description: 'Retrieve all resume versions with filtering and pagination'
    })
    @ApiResponse({
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
    })
    async findAll(@Query() queryDto: QueryResumeDto) {
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

    @Get('active')
    @ApiOperation({
        summary: '🎯 Get Active Resume',
        description: 'Retrieve the currently active resume version'
    })
    @ApiResponse({
        status: 200,
        description: '✅ Active resume retrieved successfully'
    })
    @ApiResponse({
        status: 404,
        description: '❌ No active resume found'
    })
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

    @Get('stats')
    @ApiOperation({
        summary: '📊 Resume Statistics',
        description: 'Get comprehensive statistics about resume versions'
    })
    @ApiResponse({
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
    })
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

    @Get('version/:version')
    @ApiOperation({
        summary: '🔍 Get Resume by Version',
        description: 'Retrieve specific resume version'
    })
    @ApiParam({ name: 'version', description: 'Resume version identifier', example: 'v2024.1' })
    @ApiResponse({
        status: 200,
        description: '✅ Resume version found'
    })
    @ApiResponse({
        status: 404,
        description: '❌ Resume version not found'
    })
    async findByVersion(@Param('version') version: string) {
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

    @Get(':id')
    @ApiOperation({
        summary: '📄 Get Resume by ID',
        description: 'Retrieve specific resume by database ID'
    })
    @ApiParam({ name: 'id', description: 'Resume database ID', example: 1 })
    @ApiResponse({
        status: 200,
        description: '✅ Resume found successfully'
    })
    @ApiResponse({
        status: 404,
        description: '❌ Resume not found'
    })
    async findOne(@Param('id', ParseIntPipe) id: number) {
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

    @Get(':id/pdf')
    @ApiOperation({
        summary: '📁 Generate & Download PDF',
        description: 'Generate PDF version of resume and download'
    })
    @ApiParam({ name: 'id', description: 'Resume database ID', example: 1 })
    @ApiQuery({
        name: 'template',
        required: false,
        description: 'PDF template style',
        example: 'cyberpunk',
        enum: ['modern', 'classic', 'cyberpunk']
    })
    @ApiResponse({
        status: 200,
        description: '✅ PDF generated and downloaded',
        headers: {
            'Content-Type': { description: 'application/pdf' },
            'Content-Disposition': { description: 'attachment; filename="resume.pdf"' }
        }
    })
    @ApiResponse({
        status: 404,
        description: '❌ Resume not found'
    })
    async downloadPDF(
        @Param('id', ParseIntPipe) id: number,
        @Query('template') template: string = 'modern',
        @Res() res: Response
    ) {
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

    @Patch(':id')
    @ApiOperation({
        summary: '✏️ Update Resume Version',
        description: 'Modify existing resume version data'
    })
    @ApiParam({ name: 'id', description: 'Resume database ID', example: 1 })
    @ApiResponse({
        status: 200,
        description: '✅ Resume updated successfully'
    })
    @ApiResponse({
        status: 404,
        description: '❌ Resume not found'
    })
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateResumeDto: UpdateResumeDto) {
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

    @Patch(':id/activate')
    @ApiOperation({
        summary: '🎯 Activate Resume Version',
        description: 'Set specific resume version as active (deactivates others)'
    })
    @ApiParam({ name: 'id', description: 'Resume database ID', example: 1 })
    @ApiResponse({
        status: 200,
        description: '✅ Resume activated successfully'
    })
    @ApiResponse({
        status: 404,
        description: '❌ Resume not found'
    })
    @HttpCode(HttpStatus.OK)
    async setActive(@Param('id', ParseIntPipe) id: number) {
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

    @Delete(':id')
    @ApiOperation({
        summary: '🗑️ Delete Resume Version',
        description: 'Permanently delete resume version from system'
    })
    @ApiParam({ name: 'id', description: 'Resume database ID', example: 1 })
    @ApiResponse({
        status: 200,
        description: '✅ Resume deleted successfully'
    })
    @ApiResponse({
        status: 404,
        description: '❌ Resume not found'
    })
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id', ParseIntPipe) id: number) {
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
} 