export declare enum ProjectStatus {
    PLANNING = "planning",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    ARCHIVED = "archived"
}
export declare class Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
    featured: boolean;
    status: ProjectStatus;
    createdAt: Date;
    updatedAt: Date;
}
