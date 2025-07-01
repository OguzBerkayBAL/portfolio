import { ProjectStatus } from '../../../entities/project.entity';
export declare class CreateProjectDto {
    title: string;
    description: string;
    longDescription?: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
    featured?: boolean;
    status?: ProjectStatus;
}
