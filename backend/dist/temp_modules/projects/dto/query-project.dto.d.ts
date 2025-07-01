import { ProjectStatus } from '../../../entities/project.entity';
export declare class QueryProjectDto {
    status?: ProjectStatus;
    featured?: boolean;
    search?: string;
    technology?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
}
