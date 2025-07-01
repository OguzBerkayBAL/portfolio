import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { QueryExperienceDto } from './dto/query-experience.dto';
export declare class ExperienceController {
    private readonly experienceService;
    constructor(experienceService: ExperienceService);
    create(createExperienceDto: CreateExperienceDto): Promise<{
        success: boolean;
        message: string;
        data: Experience;
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    findAll(queryDto: QueryExperienceDto): Promise<{
        terminal: {
            command: string;
            output: string;
            status: string;
        };
        data: Experience[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        success: boolean;
        message: string;
    }>;
    getTimeline(): Promise<{
        success: boolean;
        message: string;
        data: Experience[];
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    getCurrent(): Promise<{
        success: boolean;
        message: string;
        data: Experience[];
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
            current: number;
            totalYears: number;
            companiesCount: number;
            techStats: {
                totalTechnologies: number;
                topTechnologies: {
                    technology: string;
                    count: unknown;
                }[];
            };
            averageJobDuration: number;
        };
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: Experience;
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    update(id: string, updateExperienceDto: UpdateExperienceDto): Promise<{
        success: boolean;
        message: string;
        data: Experience;
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
}
