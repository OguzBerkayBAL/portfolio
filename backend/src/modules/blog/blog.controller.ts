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
import { BlogService } from './blog.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { QueryBlogPostDto } from './dto/query-blog-post.dto';

@ApiTags('📰 Neural Archive')
@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    @Post()
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: '📰 Upload Data Node',
        description: 'Upload new information node to neural archive matrix',
    })
    @ApiResponse({
        status: 201,
        description: 'Data node successfully integrated into neural archive',
    })
    @ApiResponse({
        status: 409,
        description: 'Data node with slug already exists in archive',
    })
    async create(@Body() createBlogPostDto: CreateBlogPostDto) {
        const blogPost = await this.blogService.create(createBlogPostDto);
        return {
            success: true,
            message: `📰 Data node "${blogPost.title}" uploaded to neural archive!`,
            data: blogPost,
            terminal: {
                command: `archive.upload("${blogPost.slug}")`,
                output: `> Information node integrated: ${blogPost.readTime}min read`,
                status: 'DATA_NODE_CREATED',
            },
        };
    }

    @Get()
    @ApiOperation({
        summary: '📋 Scan Neural Archive',
        description: 'Retrieve information nodes from neural archive database',
    })
    @ApiResponse({
        status: 200,
        description: 'Neural archive scan completed successfully',
    })
    async findAll(@Query() queryDto: QueryBlogPostDto) {
        const result = await this.blogService.findAll(queryDto);
        return {
            success: true,
            message: `📋 Archive scan complete: ${result.data.length} data nodes retrieved`,
            ...result,
            terminal: {
                command: 'archive.scan(--full-database --sort-chronological)',
                output: `> ${result.total} information nodes in neural matrix`,
                status: 'ARCHIVE_SCAN_COMPLETE',
            },
        };
    }

    @Get('published')
    @ApiOperation({
        summary: '🌐 Public Archive Access',
        description: 'Access only published information nodes from neural archive',
    })
    @ApiResponse({
        status: 200,
        description: 'Public archive data retrieved successfully',
    })
    async findPublished(@Query() queryDto: QueryBlogPostDto) {
        const result = await this.blogService.findPublished(queryDto);
        return {
            success: true,
            message: `🌐 Public archive accessed: ${result.data.length} published nodes`,
            ...result,
            terminal: {
                command: 'archive.public(--published-only)',
                output: `> ${result.total} active information nodes accessible`,
                status: 'PUBLIC_ACCESS_GRANTED',
            },
        };
    }

    @Get('popular')
    @ApiOperation({
        summary: '🔥 Popular Data Nodes',
        description: 'Retrieve most accessed information from neural archive',
    })
    @ApiResponse({
        status: 200,
        description: 'Popular content analysis completed',
    })
    async findPopular(@Query('limit') limit?: number) {
        const popularPosts = await this.blogService.findPopular(limit);
        return {
            success: true,
            message: `🔥 Popular nodes analyzed: ${popularPosts.length} high-traffic data nodes`,
            data: popularPosts,
            terminal: {
                command: `archive.analyze(--sort-by-views --limit=${limit || 10})`,
                output: `> Neural matrix popularity scan complete`,
                status: 'POPULARITY_ANALYSIS_COMPLETE',
            },
        };
    }

    @Get('tags')
    @ApiOperation({
        summary: '🏷️ Archive Tag Matrix',
        description: 'Retrieve all available tags from neural archive classification system',
    })
    @ApiResponse({
        status: 200,
        description: 'Tag matrix compiled successfully',
    })
    async getTags() {
        const tags = await this.blogService.getTags();
        return {
            success: true,
            message: `🏷️ Tag matrix compiled: ${tags.length} classification nodes`,
            data: tags,
            terminal: {
                command: 'archive.tags(--classification-matrix)',
                output: `> ${tags.length} unique identifiers in tag database`,
                status: 'TAG_MATRIX_COMPILED',
            },
        };
    }

    @Get('stats')
    @ApiOperation({
        summary: '📊 Neural Archive Analytics',
        description: 'Analyze neural archive database performance and statistics',
    })
    @ApiResponse({
        status: 200,
        description: 'Archive analytics compiled successfully',
    })
    async getStats() {
        const stats = await this.blogService.getBlogStats();
        return {
            success: true,
            message: '📊 Neural archive analytics complete',
            data: stats,
            terminal: {
                command: 'archive.analyze(--deep-scan --performance-metrics)',
                output: `> ${stats.total} nodes | ${stats.avgReadingTime}min avg read time`,
                status: 'ANALYTICS_COMPLETE',
            },
        };
    }

    @Get('slug/:slug')
    @ApiOperation({
        summary: '🎯 Access by Archive Key',
        description: 'Access specific data node using neural archive key (slug)',
    })
    @ApiParam({
        name: 'slug',
        description: 'Neural archive key (URL slug)',
        example: 'building-cyberpunk-portfolio-nestjs-react',
    })
    @ApiResponse({
        status: 200,
        description: 'Data node accessed successfully',
    })
    @ApiResponse({
        status: 404,
        description: 'Archive key not found in neural database',
    })
    async findBySlug(
        @Param('slug') slug: string,
        @Query('view') incrementView?: boolean,
    ) {
        const blogPost = await this.blogService.findBySlug(slug, incrementView);
        return {
            success: true,
            message: `🎯 Data node "${blogPost.title}" accessed via archive key`,
            data: blogPost,
            terminal: {
                command: `archive.access(key="${slug}", increment_view=${!!incrementView})`,
                output: `> Neural data retrieved: ${blogPost.readTime}min read`,
                status: 'NODE_ACCESS_GRANTED',
            },
        };
    }

    @Get(':id')
    @ApiOperation({
        summary: '🔍 Access Data Node',
        description: 'Direct access to information node via neural ID',
    })
    @ApiResponse({
        status: 200,
        description: 'Data node accessed successfully',
    })
    @ApiResponse({
        status: 404,
        description: 'Data node not found in neural archive',
    })
    async findOne(
        @Param('id', ParseUUIDPipe) id: string,
        @Query('view') incrementView?: boolean,
    ) {
        const blogPost = await this.blogService.findOne(id, incrementView);
        return {
            success: true,
            message: `🔍 Data node "${blogPost.title}" accessed`,
            data: blogPost,
            terminal: {
                command: `archive.access(id="${blogPost.id}", increment_view=${!!incrementView})`,
                output: `> Neural data loaded: ${blogPost.slug}`,
                status: 'NODE_ACCESS_GRANTED',
            },
        };
    }

    @Patch(':id')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: '🔧 Modify Data Node',
        description: 'Update information node in neural archive matrix',
    })
    @ApiResponse({
        status: 200,
        description: 'Data node updated successfully',
    })
    @ApiResponse({
        status: 404,
        description: 'Data node not found in neural archive',
    })
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateBlogPostDto: UpdateBlogPostDto,
    ) {
        const blogPost = await this.blogService.update(id, updateBlogPostDto);
        return {
            success: true,
            message: `🔧 Data node "${blogPost.title}" updated in neural archive`,
            data: blogPost,
            terminal: {
                command: `archive.modify(id="${blogPost.id}", data={...})`,
                output: `> Neural data recalibrated: ${blogPost.readTime}min read`,
                status: 'NODE_UPDATE_COMPLETE',
            },
        };
    }

    @Delete(':id')
    @ApiBearerAuth('JWT-auth')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: '🗑️ Delete Data Node',
        description: 'Remove information node from neural archive matrix',
    })
    @ApiResponse({
        status: 204,
        description: 'Data node deleted from neural archive',
    })
    @ApiResponse({
        status: 404,
        description: 'Data node not found in neural archive',
    })
    async remove(@Param('id', ParseUUIDPipe) id: string) {
        await this.blogService.remove(id);
        return {
            success: true,
            message: '🗑️ Data node deleted from neural archive matrix',
            terminal: {
                command: `archive.delete(id="${id}")`,
                output: `> Information node permanently archived`,
                status: 'NODE_DELETION_COMPLETE',
            },
        };
    }

    @Post(':id/view')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '👁️ Increment View Counter',
        description: 'Register access event for data node analytics',
    })
    @ApiResponse({
        status: 200,
        description: 'View count incremented successfully',
    })
    async incrementView(@Param('id', ParseUUIDPipe) id: string) {
        // ViewCount feature temporarily disabled until entity update
        return {
            success: true,
            message: '👁️ View counter feature temporarily offline',
            terminal: {
                command: `archive.track_view(id="${id}")`,
                output: `> Neural matrix recalibrating - view counter offline`,
                status: 'FEATURE_DISABLED',
            },
        };
    }
} 