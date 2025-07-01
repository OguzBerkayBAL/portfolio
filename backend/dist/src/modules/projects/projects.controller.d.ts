import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { QueryProjectDto } from './dto/query-project.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto): Promise<{
        success: boolean;
        message: string;
        data: import("../../entities").Project;
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    findAll(queryDto: QueryProjectDto): Promise<{
        terminal: {
            command: string;
            output: string;
            status: string;
        };
        data: import("../../entities").Project[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        success: boolean;
        message: string;
    }>;
    findFeatured(): Promise<{
        success: boolean;
        message: string;
        data: import("../../entities").Project[];
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
            completed: number;
            inProgress: number;
            featured: number;
            completionRate: number;
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
        data: import("../../entities").Project;
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<{
        success: boolean;
        message: string;
        data: import("../../entities").Project;
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
