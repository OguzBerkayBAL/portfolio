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
    ApiParam,
} from '@nestjs/swagger';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { QuerySkillDto } from './dto/query-skill.dto';
import { SkillCategory } from '../../entities/skill.entity';

@ApiTags('⚡ Skills')
@Controller('skills')
export class SkillsController {
    constructor(private readonly skillsService: SkillsService) { }

    @Post()
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: '⚡ Add New Skill',
        description: 'Upload a new technology skill to the neural matrix',
    })
    @ApiResponse({
        status: 201,
        description: 'Skill successfully integrated into matrix',
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid skill data provided',
    })
    async create(@Body() createSkillDto: CreateSkillDto) {
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

    @Get()
    @ApiOperation({
        summary: '🔍 List Technology Skills',
        description: 'Scan the neural matrix for available technology skills',
    })
    @ApiResponse({
        status: 200,
        description: 'Skills retrieved from neural matrix',
    })
    async findAll(@Query() queryDto: QuerySkillDto) {
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

    @Get('category/:category')
    @ApiOperation({
        summary: '📂 Get Skills by Category',
        description: 'Retrieve skills from specific neural pathway',
    })
    @ApiParam({
        name: 'category',
        enum: SkillCategory,
        description: 'Skill category to scan',
    })
    @ApiResponse({
        status: 200,
        description: 'Category skills retrieved successfully',
    })
    async findByCategory(@Param('category') category: SkillCategory) {
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

    @Get('stats')
    @ApiOperation({
        summary: '📊 Neural Matrix Analytics',
        description: 'Analyze skill distribution and proficiency metrics',
    })
    @ApiResponse({
        status: 200,
        description: 'Skill analytics compiled successfully',
    })
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

    @Get(':id')
    @ApiOperation({
        summary: '🎯 Get Skill Details',
        description: 'Deep scan specific skill node in neural matrix',
    })
    @ApiResponse({
        status: 200,
        description: 'Skill node accessed successfully',
    })
    @ApiResponse({
        status: 404,
        description: 'Skill node not found in matrix',
    })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
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

    @Patch(':id')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: '🔧 Update Skill Node',
        description: 'Modify skill parameters in neural matrix',
    })
    @ApiResponse({
        status: 200,
        description: 'Skill node updated successfully',
    })
    @ApiResponse({
        status: 404,
        description: 'Skill node not found in matrix',
    })
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateSkillDto: UpdateSkillDto,
    ) {
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

    @Delete(':id')
    @ApiBearerAuth('JWT-auth')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: '🗑️ Delete Skill Node',
        description: 'Remove skill from neural matrix permanently',
    })
    @ApiResponse({
        status: 204,
        description: 'Skill node deleted from matrix',
    })
    @ApiResponse({
        status: 404,
        description: 'Skill node not found in matrix',
    })
    async remove(@Param('id', ParseUUIDPipe) id: string) {
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

    @Post('reorder/:category')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: '🔄 Reorder Skills in Category',
        description: 'Reorganize skill nodes within neural pathway',
    })
    @ApiParam({
        name: 'category',
        enum: SkillCategory,
        description: 'Category to reorder',
    })
    @ApiResponse({
        status: 200,
        description: 'Skills reordered successfully',
    })
    async reorderSkills(
        @Param('category') category: SkillCategory,
        @Body() skillOrders: { id: string; order: number }[],
    ) {
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
} 