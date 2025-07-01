export declare enum SkillCategory {
    FRONTEND = "frontend",
    BACKEND = "backend",
    DATABASE = "database",
    DEVOPS = "devops",
    DESIGN = "design",
    TOOLS = "tools"
}
export declare enum SkillLevel {
    BEGINNER = 1,
    INTERMEDIATE = 2,
    ADVANCED = 3,
    EXPERT = 4
}
export declare class Skill {
    id: string;
    name: string;
    category: SkillCategory;
    level: SkillLevel;
    icon?: string;
    color?: string;
    order: number;
}
