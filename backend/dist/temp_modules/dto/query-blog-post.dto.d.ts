export declare class QueryBlogPostDto {
    search?: string;
    tag?: string;
    published?: boolean;
    createdAfter?: string;
    createdBefore?: string;
    minReadingTime?: number;
    maxReadingTime?: number;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
    includeContent?: boolean;
}
