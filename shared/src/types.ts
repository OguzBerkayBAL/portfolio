// Core entity interfaces
export interface Project {
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

export interface Skill {
    id: string;
    name: string;
    category: SkillCategory;
    level: SkillLevel;
    icon?: string;
    color?: string;
    order: number;
}

export interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    description: string;
    technologies: string[];
    achievements: string[];
}

export interface BlogPost {
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

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: MessageStatus;
    createdAt: Date;
    readAt?: Date;
}

// Enums
export enum ProjectStatus {
    PLANNING = 'planning',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    ARCHIVED = 'archived'
}

export enum SkillCategory {
    FRONTEND = 'frontend',
    BACKEND = 'backend',
    DATABASE = 'database',
    DEVOPS = 'devops',
    DESIGN = 'design',
    TOOLS = 'tools'
}

export enum SkillLevel {
    BEGINNER = 1,
    INTERMEDIATE = 2,
    ADVANCED = 3,
    EXPERT = 4
}

export enum MessageStatus {
    UNREAD = 'unread',
    READ = 'read',
    REPLIED = 'replied',
    ARCHIVED = 'archived'
}

// API Response types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// Dark Theme specific types
export interface ThemeColors {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    success: string;
    warning: string;
    error: string;
}

export interface TerminalCommand {
    command: string;
    output: string;
    timestamp: Date;
}

// Animation types for Dark Tech theme
export interface GlitchEffect {
    duration: number;
    intensity: 'low' | 'medium' | 'high';
    trigger: 'hover' | 'click' | 'auto';
}

export interface TypingAnimation {
    text: string;
    speed: number;
    delay: number;
    cursor: boolean;
}

// Component props interfaces
export interface TerminalWindowProps {
    title?: string;
    commands: TerminalCommand[];
    className?: string;
}

export interface NeonButtonProps {
    variant: 'primary' | 'secondary' | 'accent';
    size: 'sm' | 'md' | 'lg';
    glowEffect?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

export interface MatrixRainProps {
    density: number;
    speed: number;
    opacity: number;
    className?: string;
} 