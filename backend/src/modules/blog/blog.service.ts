import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { BlogPost } from '../../entities/blog-post.entity';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { QueryBlogPostDto } from './dto/query-blog-post.dto';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(BlogPost)
        private readonly blogPostRepository: Repository<BlogPost>,
    ) { }

    async create(createBlogPostDto: CreateBlogPostDto): Promise<BlogPost> {
        const { slug, content, ...rest } = createBlogPostDto;

        // Auto-generate slug if not provided
        const generatedSlug = slug || this.generateSlug(createBlogPostDto.title);

        // Check if slug already exists
        const existingPost = await this.blogPostRepository.findOne({ where: { slug: generatedSlug } });
        if (existingPost) {
            throw new ConflictException(`Blog post with slug "${generatedSlug}" already exists in neural archive`);
        }

        // Auto-calculate reading time if not provided
        const readTime = createBlogPostDto.readTime || this.calculateReadingTime(content);

        const blogPost = this.blogPostRepository.create({
            ...rest,
            slug: generatedSlug,
            content,
            readTime,
        });

        return await this.blogPostRepository.save(blogPost);
    }

    async findAll(queryDto: QueryBlogPostDto) {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'DESC', includeContent = false, ...filters } = queryDto;

        const queryBuilder = this.blogPostRepository.createQueryBuilder('blogPost');

        // Select fields conditionally
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

        // Apply filters
        this.applyFilters(queryBuilder, filters);

        // Apply sorting
        queryBuilder.orderBy(`blogPost.${sortBy}`, sortOrder);

        // Secondary sort for consistent ordering
        if (sortBy !== 'createdAt') {
            queryBuilder.addOrderBy('blogPost.createdAt', 'DESC');
        }

        // Apply pagination
        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);

        // Get results with count
        const [blogPosts, total] = await queryBuilder.getManyAndCount();

        return {
            data: blogPosts,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findOne(id: string, incrementView: boolean = false): Promise<BlogPost> {
        const blogPost = await this.blogPostRepository.findOne({
            where: { id },
        });

        if (!blogPost) {
            throw new NotFoundException(`Blog post with ID ${id} not found in neural archive`);
        }

        // Note: View count feature temporarily disabled until entity update

        return blogPost;
    }

    async findBySlug(slug: string, incrementView: boolean = false): Promise<BlogPost> {
        const blogPost = await this.blogPostRepository.findOne({
            where: { slug },
        });

        if (!blogPost) {
            throw new NotFoundException(`Blog post with slug "${slug}" not found in neural archive`);
        }

        // Note: View count feature temporarily disabled until entity update

        return blogPost;
    }

    async findPublished(queryDto: QueryBlogPostDto) {
        return this.findAll({ ...queryDto, published: true });
    }

    async findPopular(limit: number = 10): Promise<BlogPost[]> {
        return await this.blogPostRepository.find({
            where: { published: true },
            order: { createdAt: 'DESC' },
            take: limit,
            select: ['id', 'title', 'slug', 'excerpt', 'featuredImage', 'readTime', 'createdAt'],
        });
    }

    async update(id: string, updateBlogPostDto: UpdateBlogPostDto): Promise<BlogPost> {
        const blogPost = await this.findOne(id); // This will throw if not found

        // Handle slug update
        if (updateBlogPostDto.slug && updateBlogPostDto.slug !== blogPost.slug) {
            const existingPost = await this.blogPostRepository.findOne({
                where: { slug: updateBlogPostDto.slug }
            });
            if (existingPost && existingPost.id !== id) {
                throw new ConflictException(`Blog post with slug "${updateBlogPostDto.slug}" already exists`);
            }
        }

        // Recalculate reading time if content is updated
        if (updateBlogPostDto.content) {
            updateBlogPostDto.readTime = this.calculateReadingTime(updateBlogPostDto.content);
        }

        Object.assign(blogPost, updateBlogPostDto);
        return await this.blogPostRepository.save(blogPost);
    }

    async remove(id: string): Promise<void> {
        const blogPost = await this.findOne(id); // This will throw if not found
        await this.blogPostRepository.remove(blogPost);
    }

    // ViewCount method temporarily disabled until entity update

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

    async getTags(): Promise<string[]> {
        const blogPosts = await this.blogPostRepository.find({
            select: ['tags'],
            where: { published: true },
        });

        const allTags = blogPosts.reduce((tags, post) => {
            if (post.tags) {
                tags.push(...post.tags);
            }
            return tags;
        }, [] as string[]);

        // Return unique tags sorted alphabetically
        return [...new Set(allTags)].sort();
    }

    private generateSlug(title: string): string {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single
            .trim()
            .substring(0, 200); // Limit length
    }

    private calculateReadingTime(content: string): number {
        const wordsPerMinute = 200; // Average reading speed
        const wordCount = content.split(/\s+/).length;
        return Math.ceil(wordCount / wordsPerMinute);
    }

    // getTotalViews method temporarily disabled until entity update

    private async getAverageReadingTime(): Promise<number> {
        const result = await this.blogPostRepository
            .createQueryBuilder('blogPost')
            .select('AVG(blogPost.readTime)', 'avgReadingTime')
            .where('blogPost.published = :published', { published: true })
            .getRawOne();

        return Math.round(parseFloat(result.avgReadingTime)) || 0;
    }

    private async getPopularTags(): Promise<Array<{ tag: string; count: number }>> {
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

        // Sort by count and return top 10
        return Object.entries(tagCount)
            .sort(([, a], [, b]) => (b as number) - (a as number))
            .slice(0, 10)
            .map(([tag, count]) => ({ tag, count: count as number }));
    }

    private applyFilters(
        queryBuilder: SelectQueryBuilder<BlogPost>,
        filters: Partial<QueryBlogPostDto>,
    ) {
        const { search, tag, published, createdAfter, createdBefore, minReadingTime, maxReadingTime } = filters;

        if (search) {
            queryBuilder.andWhere(
                '(blogPost.title ILIKE :search OR blogPost.excerpt ILIKE :search OR blogPost.content ILIKE :search)',
                { search: `%${search}%` },
            );
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
} 