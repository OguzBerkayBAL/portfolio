// API Response Types
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    timestamp: string;
    system?: {
        status: string;
        security_level?: string;
        module?: string;
    };
    terminal?: {
        command: string;
        output: string;
        status: string;
    };
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// User & Auth Types
export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

export enum UserStatus {
    ACTIVE = 'active',
    PENDING = 'pending',
    SUSPENDED = 'suspended',
}

export interface User {
    id: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: UserRole;
    status: UserStatus;
    createdAt: string;
    updatedAt: string;
}

export interface AuthTokens {
    access_token: string;
    refresh_token?: string;
}

export interface AuthResponse {
    user: User;
    tokens: AuthTokens;
    session: {
        expiresIn: number;
        issuedAt: number;
        rememberMe: boolean;
    };
}

export interface LoginDto {
    usernameOrEmail: string;
    password: string;
    rememberMe?: boolean;
}



export interface ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}

// Project Types
export enum ProjectStatus {
    PLANNING = 'planning',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    ARCHIVED = 'archived',
}

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
    createdAt: string;
    updatedAt: string;
}

export interface CreateProjectDto {
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

// Skill Types
export enum SkillCategory {
    FRONTEND = 'frontend',
    BACKEND = 'backend',
    DATABASE = 'database',
    DEVOPS = 'devops',
    AI_ML = 'ai-ml',
    DESIGN = 'design',
    TOOLS = 'tools',
}

export enum SkillLevel {
    BEGINNER = 1,
    INTERMEDIATE = 2,
    ADVANCED = 3,
    EXPERT = 4,
}

export interface Skill {
    id: string;
    name: string;
    category: SkillCategory;
    level: SkillLevel;
    icon?: string;
    color?: string;
    order: number;
    description?: string;
    yearsOfExperience?: number;
}

export interface CreateSkillDto {
    name: string;
    category: SkillCategory;
    level: SkillLevel;
    icon?: string;
    color?: string;
    order?: number;
}

// Experience Types
export interface Experience {
    id: string;
    title: string;
    company: string;
    location?: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
    technologies: string[];
    achievements: string[];
}

export interface CreateExperienceDto {
    title: string;
    company: string;
    location?: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description: string;
    technologies?: string[];
    achievements?: string[];
}

// Blog Types
export interface BlogPost {
    id: string;
    title: string;
    content: string;
    excerpt?: string;
    tags: string[];
    imageUrl?: string;
    published: boolean;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateBlogPostDto {
    title: string;
    content: string;
    excerpt?: string;
    tags: string[];
    imageUrl?: string;
    published?: boolean;
}

// Contact Types
export enum MessageStatus {
    UNREAD = 'unread',
    READ = 'read',
    REPLIED = 'replied',
    ARCHIVED = 'archived',
}

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: MessageStatus;
    createdAt: string;
    updatedAt: string;
}

export interface CreateContactMessageDto {
    name: string;
    email: string;
    subject: string;
    message: string;
}

// Resume Types
export interface Resume {
    id: string;
    filename: string;
    originalName: string;
    fileUrl: string;
    fileSize: number;
    uploadedAt: string;
}

// Query/Filter Types
export interface QueryParams {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
}

export interface ProjectQueryDto extends QueryParams {
    status?: ProjectStatus;
    featured?: boolean;
    technologies?: string;
}

export interface SkillQueryDto extends QueryParams {
    category?: SkillCategory;
    level?: SkillLevel;
}

export interface ExperienceQueryDto extends QueryParams {
    current?: boolean;
    company?: string;
}

export interface BlogQueryDto extends QueryParams {
    published?: boolean;
    tags?: string;
}

export interface ContactQueryDto extends QueryParams {
    status?: MessageStatus;
}

// UI/Component Types
export interface LoadingState {
    isLoading: boolean;
    error?: string;
}

export interface FormErrors {
    [key: string]: string;
}

export interface CyberButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export interface CyberInputProps {
    label?: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
} 