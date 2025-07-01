export declare class BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    tags: string[];
    published: boolean;
    featuredImage?: string;
    readTime: number;
    createdAt: Date;
    updatedAt: Date;
}
