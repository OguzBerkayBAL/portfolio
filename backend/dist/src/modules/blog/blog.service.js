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
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const blog_post_entity_1 = require("../../entities/blog-post.entity");
let BlogService = class BlogService {
    blogPostRepository;
    constructor(blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }
    async create(createBlogPostDto) {
        const { slug, content, ...rest } = createBlogPostDto;
        const generatedSlug = slug || this.generateSlug(createBlogPostDto.title);
        const existingPost = await this.blogPostRepository.findOne({ where: { slug: generatedSlug } });
        if (existingPost) {
            throw new common_1.ConflictException(`Blog post with slug "${generatedSlug}" already exists in neural archive`);
        }
        const readTime = createBlogPostDto.readTime || this.calculateReadingTime(content);
        const blogPost = this.blogPostRepository.create({
            ...rest,
            slug: generatedSlug,
            content,
            readTime,
        });
        return await this.blogPostRepository.save(blogPost);
    }
    async findAll(queryDto) {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'DESC', includeContent = false, ...filters } = queryDto;
        const queryBuilder = this.blogPostRepository.createQueryBuilder('blogPost');
        if (!includeContent) {
            queryBuilder.select([
                'blogPost.id',
                'blogPost.title',
                'blogPost.slug',
                'blogPost.excerpt',
                'blogPost.tags',
                'blogPost.published',
                'blogPost.featuredImage',
                'blogPost.readTime',
                'blogPost.createdAt',
                'blogPost.updatedAt',
            ]);
        }
        this.applyFilters(queryBuilder, filters);
        queryBuilder.orderBy(`blogPost.${sortBy}`, sortOrder);
        if (sortBy !== 'createdAt') {
            queryBuilder.addOrderBy('blogPost.createdAt', 'DESC');
        }
        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);
        const [blogPosts, total] = await queryBuilder.getManyAndCount();
        return {
            data: blogPosts,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id, incrementView = false) {
        const blogPost = await this.blogPostRepository.findOne({
            where: { id },
        });
        if (!blogPost) {
            throw new common_1.NotFoundException(`Blog post with ID ${id} not found in neural archive`);
        }
        return blogPost;
    }
    async findBySlug(slug, incrementView = false) {
        const blogPost = await this.blogPostRepository.findOne({
            where: { slug },
        });
        if (!blogPost) {
            throw new common_1.NotFoundException(`Blog post with slug "${slug}" not found in neural archive`);
        }
        return blogPost;
    }
    async findPublished(queryDto) {
        return this.findAll({ ...queryDto, published: true });
    }
    async findPopular(limit = 10) {
        return await this.blogPostRepository.find({
            where: { published: true },
            order: { createdAt: 'DESC' },
            take: limit,
            select: ['id', 'title', 'slug', 'excerpt', 'featuredImage', 'readTime', 'createdAt'],
        });
    }
    async update(id, updateBlogPostDto) {
        const blogPost = await this.findOne(id);
        if (updateBlogPostDto.slug && updateBlogPostDto.slug !== blogPost.slug) {
            const existingPost = await this.blogPostRepository.findOne({
                where: { slug: updateBlogPostDto.slug }
            });
            if (existingPost && existingPost.id !== id) {
                throw new common_1.ConflictException(`Blog post with slug "${updateBlogPostDto.slug}" already exists`);
            }
        }
        if (updateBlogPostDto.content) {
            updateBlogPostDto.readTime = this.calculateReadingTime(updateBlogPostDto.content);
        }
        Object.assign(blogPost, updateBlogPostDto);
        return await this.blogPostRepository.save(blogPost);
    }
    async remove(id) {
        const blogPost = await this.findOne(id);
        await this.blogPostRepository.remove(blogPost);
    }
    async getBlogStats() {
        const [total, published, draft, avgReadingTime, popularTags] = await Promise.all([
            this.blogPostRepository.count(),
            this.blogPostRepository.count({ where: { published: true } }),
            this.blogPostRepository.count({ where: { published: false } }),
            this.getAverageReadingTime(),
            this.getPopularTags(),
        ]);
        return {
            total,
            published,
            draft,
            avgReadingTime,
            popularTags,
            publishedRatio: total > 0 ? Math.round((published / total) * 100) : 0,
        };
    }
    async getTags() {
        const blogPosts = await this.blogPostRepository.find({
            select: ['tags'],
            where: { published: true },
        });
        const allTags = blogPosts.reduce((tags, post) => {
            if (post.tags) {
                tags.push(...post.tags);
            }
            return tags;
        }, []);
        return [...new Set(allTags)].sort();
    }
    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim()
            .substring(0, 200);
    }
    calculateReadingTime(content) {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        return Math.ceil(wordCount / wordsPerMinute);
    }
    async getAverageReadingTime() {
        const result = await this.blogPostRepository
            .createQueryBuilder('blogPost')
            .select('AVG(blogPost.readTime)', 'avgReadingTime')
            .where('blogPost.published = :published', { published: true })
            .getRawOne();
        return Math.round(parseFloat(result.avgReadingTime)) || 0;
    }
    async getPopularTags() {
        const blogPosts = await this.blogPostRepository.find({
            select: ['tags'],
            where: { published: true },
        });
        const tagCount = {};
        blogPosts.forEach(post => {
            if (post.tags) {
                post.tags.forEach(tag => {
                    tagCount[tag] = (tagCount[tag] || 0) + 1;
                });
            }
        });
        return Object.entries(tagCount)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([tag, count]) => ({ tag, count: count }));
    }
    applyFilters(queryBuilder, filters) {
        const { search, tag, published, createdAfter, createdBefore, minReadingTime, maxReadingTime } = filters;
        if (search) {
            queryBuilder.andWhere('(blogPost.title ILIKE :search OR blogPost.excerpt ILIKE :search OR blogPost.content ILIKE :search)', { search: `%${search}%` });
        }
        if (tag) {
            queryBuilder.andWhere(':tag = ANY(blogPost.tags)', { tag });
        }
        if (published !== undefined) {
            queryBuilder.andWhere('blogPost.published = :published', { published });
        }
        if (createdAfter) {
            queryBuilder.andWhere('blogPost.createdAt >= :createdAfter', {
                createdAfter: new Date(createdAfter)
            });
        }
        if (createdBefore) {
            queryBuilder.andWhere('blogPost.createdAt <= :createdBefore', {
                createdBefore: new Date(createdBefore)
            });
        }
        if (minReadingTime) {
            queryBuilder.andWhere('blogPost.readTime >= :minReadingTime', { minReadingTime });
        }
        if (maxReadingTime) {
            queryBuilder.andWhere('blogPost.readTime <= :maxReadingTime', { maxReadingTime });
        }
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blog_post_entity_1.BlogPost)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BlogService);
//# sourceMappingURL=blog.service.js.map