export declare class CreateBlogPostDto {
    title: string;
    slug?: string;
    excerpt: string;
    content: string;
    tags?: string[];
    published?: boolean;
    featuredImage?: string;
    metaDescription?: string;
    readTime?: number;
}
