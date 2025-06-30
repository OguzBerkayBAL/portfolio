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
} from '@nestjs/swagger';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { QueryExperienceDto } from './dto/query-experience.dto';

@ApiTags('💼 Experience')
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '💼 Add Career Node',
    description: 'Upload new professional experience to career matrix',
  })
  @ApiResponse({
    status: 201,
    description: 'Experience node successfully integrated',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid experience data provided',
  })
  async create(@Body() createExperienceDto: CreateExperienceDto) {
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

  @Get()
  @ApiOperation({
    summary: '📋 List Career History',
    description: 'Scan professional timeline from career matrix',
  })
  @ApiResponse({
    status: 200,
    description: 'Career history retrieved successfully',
  })
  async findAll(@Query() queryDto: QueryExperienceDto) {
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

  @Get('timeline')
  @ApiOperation({
    summary: '📅 Get Career Timeline',
    description: 'Retrieve complete professional journey chronologically',
  })
  @ApiResponse({
    status: 200,
    description: 'Career timeline compiled successfully',
  })
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

  @Get('current')
  @ApiOperation({
    summary: '⚡ Get Current Positions',
    description: 'Access active professional engagements',
  })
  @ApiResponse({
    status: 200,
    description: 'Current positions retrieved successfully',
  })
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

  @Get('stats')
  @ApiOperation({
    summary: '📊 Career Matrix Analytics',
    description: 'Analyze professional growth and technology exposure',
  })
  @ApiResponse({
    status: 200,
    description: 'Career analytics compiled successfully',
  })
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

  @Get(':id')
  @ApiOperation({
    summary: '🎯 Get Experience Details',
    description: 'Deep scan specific career node for detailed analysis',
  })
  @ApiResponse({
    status: 200,
    description: 'Experience node accessed successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Experience node not found in career matrix',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
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

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '🔧 Update Career Node',
    description: 'Modify professional experience data in career matrix',
  })
  @ApiResponse({
    status: 200,
    description: 'Experience node updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Experience node not found in career matrix',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
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

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: '🗑️ Delete Career Node',
    description: 'Remove professional experience from career matrix',
  })
  @ApiResponse({
    status: 204,
    description: 'Experience node deleted from career matrix',
  })
  @ApiResponse({
    status: 404,
    description: 'Experience node not found in career matrix',
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
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
} 