import { Response } from 'express';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { QueryResumeDto } from './dto/query-resume.dto';
export declare class ResumeController {
    private readonly resumeService;
    constructor(resumeService: ResumeService);
    create(createResumeDto: CreateResumeDto): Promise<{
        success: boolean;
        message: string;
        data: Resume;
        timestamp: string;
        system: {
            status: string;
            version: string;
            module: string;
        };
    }>;
    findAll(queryDto: QueryResumeDto): Promise<{
        success: boolean;
        message: string;
        data: Resume[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
        timestamp: string;
        system: {
            status: string;
            query_time: string;
        };
    }>;
    findActive(): Promise<{
        success: boolean;
        message: string;
        data: Resume;
        timestamp: string;
        system: {
            status: string;
            version: any;
        };
    }>;
    getStats(): Promise<{
        success: boolean;
        message: string;
        data: {
            total: number;
            active: number;
            byTemplate: Record<string, number>;
            recentCount: number;
        };
        timestamp: string;
        system: {
            status: string;
            total_versions: number;
            active_version: string;
        };
    }>;
    findByVersion(version: string): Promise<{
        success: boolean;
        message: string;
        data: Resume;
        timestamp: string;
        system: {
            status: string;
            version: any;
            template: any;
        };
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        message: string;
        data: Resume;
        timestamp: string;
        system: {
            status: string;
            id: any;
            version: any;
        };
    }>;
    downloadPDF(id: number, template: string | undefined, res: Response): Promise<void>;
    update(id: number, updateResumeDto: UpdateResumeDto): Promise<{
        success: boolean;
        message: string;
        data: Resume;
        timestamp: string;
        system: {
            status: string;
            version: any;
            last_modified: any;
        };
    }>;
    setActive(id: number): Promise<{
        success: boolean;
        message: string;
        data: Resume;
        timestamp: string;
        system: {
            status: string;
            active_version: any;
            deployment_status: string;
        };
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
        timestamp: string;
        system: {
            status: string;
            operation: string;
        };
    }>;
}
