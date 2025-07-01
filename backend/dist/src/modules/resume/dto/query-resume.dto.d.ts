export declare class QueryResumeDto {
    version?: string;
    template?: string;
    isActive?: boolean;
    search?: string;
    createdAfter?: string;
    createdBefore?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
}
