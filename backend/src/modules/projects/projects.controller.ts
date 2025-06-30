import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseUUIDPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiQuery,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { QueryProjectDto } from './dto/query-project.dto';

@ApiTags('📁 Projects')
@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Post()
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: '🚀 Create New Project',
        description: 'Create a new portfolio project entry with cyberpunk flair',
    })
    @ApiResponse({
        status: 201,
        description: 'Project successfully created',
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid project data provided',
    })
    async create(@Body() createProjectDto: CreateProjectDto) {
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

    @Get()
    @ApiOperation({
        summary: '📋 List All Projects',
        description: 'Retrieve portfolio projects with advanced filtering and cyberpunk sorting',
    })
    @ApiResponse({
        status: 200,
        description: 'Projects retrieved successfully',
    })
    async findAll(@Query() queryDto: QueryProjectDto) {
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

    @Get('featured')
    @ApiOperation({
        summary: '⭐ Get Featured Projects',
        description: 'Retrieve only the most elite projects from the matrix',
    })
    @ApiResponse({
        status: 200,
        description: 'Featured projects retrieved successfully',
    })
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

    @Get('stats')
    @ApiOperation({
        summary: '📊 Project Statistics',
        description: 'Get cyberpunk-style project statistics and metrics',
    })
    @ApiResponse({
        status: 200,
        description: 'Project statistics retrieved successfully',
    })
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

    @Get(':id')
    @ApiOperation({
        summary: '🔍 Get Project Details',
        description: 'Retrieve detailed information about a specific project from the matrix',
    })
    @ApiResponse({
        status: 200,
        description: 'Project details retrieved successfully',
    })
    @ApiResponse({
        status: 404,
        description: 'Project not found in the matrix',
    })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
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

    @Patch(':id')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: '⚡ Update Project',
        description: 'Modify project data in the portfolio matrix',
    })
    @ApiResponse({
        status: 200,
        description: 'Project updated successfully',
    })
    @ApiResponse({
        status: 404,
        description: 'Project not found in matrix',
    })
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateProjectDto: UpdateProjectDto,
    ) {
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

    @Delete(':id')
    @ApiBearerAuth('JWT-auth')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: '🗑️ Delete Project',
        description: 'Remove project from the portfolio matrix permanently',
    })
    @ApiResponse({
        status: 204,
        description: 'Project successfully deleted from matrix',
    })
    @ApiResponse({
        status: 404,
        description: 'Project not found in matrix',
    })
    async remove(@Param('id', ParseUUIDPipe) id: string) {
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
} 