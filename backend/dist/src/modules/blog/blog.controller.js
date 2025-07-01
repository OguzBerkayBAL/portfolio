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
exports.BlogController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const blog_service_1 = require("./blog.service");
const create_blog_post_dto_1 = require("./dto/create-blog-post.dto");
const update_blog_post_dto_1 = require("./dto/update-blog-post.dto");
const query_blog_post_dto_1 = require("./dto/query-blog-post.dto");
let BlogController = class BlogController {
    blogService;
    constructor(blogService) {
        this.blogService = blogService;
    }
    async create(createBlogPostDto) {
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
    async findAll(queryDto) {
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
    async findPublished(queryDto) {
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
    async findPopular(limit) {
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
    async findBySlug(slug, incrementView) {
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
    async findOne(id, incrementView) {
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
    async update(id, updateBlogPostDto) {
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
    async remove(id) {
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
    async incrementView(id) {
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
};
exports.BlogController = BlogController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: '📰 Upload Data Node',
        description: 'Upload new information node to neural archive matrix',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Data node successfully integrated into neural archive',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Data node with slug already exists in archive',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_blog_post_dto_1.CreateBlogPostDto]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '📋 Scan Neural Archive',
        description: 'Retrieve information nodes from neural archive database',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Neural archive scan completed successfully',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_blog_post_dto_1.QueryBlogPostDto]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('published'),
    (0, swagger_1.ApiOperation)({
        summary: '🌐 Public Archive Access',
        description: 'Access only published information nodes from neural archive',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Public archive data retrieved successfully',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_blog_post_dto_1.QueryBlogPostDto]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "findPublished", null);
__decorate([
    (0, common_1.Get)('popular'),
    (0, swagger_1.ApiOperation)({
        summary: '🔥 Popular Data Nodes',
        description: 'Retrieve most accessed information from neural archive',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Popular content analysis completed',
    }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "findPopular", null);
__decorate([
    (0, common_1.Get)('tags'),
    (0, swagger_1.ApiOperation)({
        summary: '🏷️ Archive Tag Matrix',
        description: 'Retrieve all available tags from neural archive classification system',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Tag matrix compiled successfully',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getTags", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({
        summary: '📊 Neural Archive Analytics',
        description: 'Analyze neural archive database performance and statistics',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Archive analytics compiled successfully',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('slug/:slug'),
    (0, swagger_1.ApiOperation)({
        summary: '🎯 Access by Archive Key',
        description: 'Access specific data node using neural archive key (slug)',
    }),
    (0, swagger_1.ApiParam)({
        name: 'slug',
        description: 'Neural archive key (URL slug)',
        example: 'building-cyberpunk-portfolio-nestjs-react',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Data node accessed successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Archive key not found in neural database',
    }),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Query)('view')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '🔍 Access Data Node',
        description: 'Direct access to information node via neural ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Data node accessed successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Data node not found in neural archive',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('view')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: '🔧 Modify Data Node',
        description: 'Update information node in neural archive matrix',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Data node updated successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Data node not found in neural archive',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_blog_post_dto_1.UpdateBlogPostDto]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({
        summary: '🗑️ Delete Data Node',
        description: 'Remove information node from neural archive matrix',
    }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Data node deleted from neural archive',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Data node not found in neural archive',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/view'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '👁️ Increment View Counter',
        description: 'Register access event for data node analytics',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'View count incremented successfully',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "incrementView", null);
exports.BlogController = BlogController = __decorate([
    (0, swagger_1.ApiTags)('📰 Neural Archive'),
    (0, common_1.Controller)('blog'),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogController);
//# sourceMappingURL=blog.controller.js.map