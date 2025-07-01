import { BlogService } from './blog.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { QueryBlogPostDto } from './dto/query-blog-post.dto';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    create(createBlogPostDto: CreateBlogPostDto): Promise<{
        success: boolean;
        message: string;
        data: import("../../entities").BlogPost;
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    findAll(queryDto: QueryBlogPostDto): Promise<{
        terminal: {
            command: string;
            output: string;
            status: string;
        };
        data: import("../../entities").BlogPost[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        success: boolean;
        message: string;
    }>;
    findPublished(queryDto: QueryBlogPostDto): Promise<{
        terminal: {
            command: string;
            output: string;
            status: string;
        };
        data: import("../../entities").BlogPost[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        success: boolean;
        message: string;
    }>;
    findPopular(limit?: number): Promise<{
        success: boolean;
        message: string;
        data: import("../../entities").BlogPost[];
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    getTags(): Promise<{
        success: boolean;
        message: string;
        data: string[];
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    getStats(): Promise<{
        success: boolean;
        message: string;
        data: {
            total: number;
            published: number;
            draft: number;
            avgReadingTime: number;
            popularTags: {
                tag: string;
                count: number;
            }[];
            publishedRatio: number;
        };
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    findBySlug(slug: string, incrementView?: boolean): Promise<{
        success: boolean;
        message: string;
        data: import("../../entities").BlogPost;
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    findOne(id: string, incrementView?: boolean): Promise<{
        success: boolean;
        message: string;
        data: import("../../entities").BlogPost;
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    update(id: string, updateBlogPostDto: UpdateBlogPostDto): Promise<{
        success: boolean;
        message: string;
        data: import("../../entities").BlogPost;
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    incrementView(id: string): Promise<{
        success: boolean;
        message: string;
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
}
