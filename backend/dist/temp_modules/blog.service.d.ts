import { Repository } from 'typeorm';
import { BlogPost } from '../../entities/blog-post.entity';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { QueryBlogPostDto } from './dto/query-blog-post.dto';
export declare class BlogService {
    private readonly blogPostRepository;
    constructor(blogPostRepository: Repository<BlogPost>);
    create(createBlogPostDto: CreateBlogPostDto): Promise<BlogPost>;
    findAll(queryDto: QueryBlogPostDto): Promise<{
        data: BlogPost[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string, incrementView?: boolean): Promise<BlogPost>;
    findBySlug(slug: string, incrementView?: boolean): Promise<BlogPost>;
    findPublished(queryDto: QueryBlogPostDto): Promise<{
        data: BlogPost[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findPopular(limit?: number): Promise<BlogPost[]>;
    update(id: string, updateBlogPostDto: UpdateBlogPostDto): Promise<BlogPost>;
    remove(id: string): Promise<void>;
    getBlogStats(): Promise<{
        total: number;
        published: number;
        draft: number;
        avgReadingTime: number;
        popularTags: {
            tag: string;
            count: number;
        }[];
        publishedRatio: number;
    }>;
    getTags(): Promise<string[]>;
    private generateSlug;
    private calculateReadingTime;
    private getAverageReadingTime;
    private getPopularTags;
    private applyFilters;
}
