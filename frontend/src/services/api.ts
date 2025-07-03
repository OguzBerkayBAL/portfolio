import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
    ApiResponse,
    PaginatedResponse,
    AuthResponse,
    LoginDto,
    ChangePasswordDto,
    Project,
    CreateProjectDto,
    ProjectQueryDto,
    Skill,
    CreateSkillDto,
    SkillQueryDto,
    Experience,
    CreateExperienceDto,
    ExperienceQueryDto,
    BlogPost,
    CreateBlogPostDto,
    BlogQueryDto,
    ContactMessage,
    CreateContactMessageDto,
    ContactQueryDto,
    Resume,
    User
} from '../types';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api/v1';

class ApiService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: API_BASE_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Request interceptor for auth token
        this.api.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('access_token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor for error handling
        this.api.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status === 401) {
                    // Token expired, try to refresh
                    const refreshToken = localStorage.getItem('refresh_token');
                    if (refreshToken) {
                        try {
                            const response = await this.refreshToken(refreshToken);
                            if (response.data?.tokens) {
                                localStorage.setItem('access_token', response.data.tokens.access_token);
                                if (response.data.tokens.refresh_token) {
                                    localStorage.setItem('refresh_token', response.data.tokens.refresh_token);
                                }
                                // Retry the original request
                                error.config.headers.Authorization = `Bearer ${response.data.tokens.access_token}`;
                                return this.api.request(error.config);
                            }
                        } catch (refreshError) {
                            // Refresh failed, redirect to login
                            localStorage.removeItem('access_token');
                            localStorage.removeItem('refresh_token');
                            window.location.href = '/auth';
                        }
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    // Helper method to extract data from API response
    private extractData<T>(response: AxiosResponse<ApiResponse<T>>): T {
        return response.data.data as T;
    }

    // Auth Endpoints
    async login(credentials: LoginDto): Promise<AuthResponse> {
        const response = await this.api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
        return this.extractData(response);
    }



    async refreshToken(refreshToken: string): Promise<ApiResponse<AuthResponse>> {
        const response = await this.api.post<ApiResponse<AuthResponse>>('/auth/refresh', {
            refresh_token: refreshToken
        });
        return response.data;
    }

    async logout(): Promise<void> {
        await this.api.post('/auth/logout');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }

    async getProfile(): Promise<User> {
        const response = await this.api.get<ApiResponse<User>>('/auth/profile');
        return this.extractData(response);
    }

    async changePassword(passwordData: ChangePasswordDto): Promise<void> {
        await this.api.patch('/auth/change-password', passwordData);
    }

    // Project Endpoints
    async getProjects(query?: ProjectQueryDto): Promise<{ data: Project[]; total: number; page: number; limit: number; totalPages: number }> {
        const response = await this.api.get('/projects', {
            params: query
        });
        // Backend response structure: { success, message, data: Project[], total, page, limit, totalPages }
        return {
            data: response.data.data || [],
            total: response.data.total || 0,
            page: response.data.page || 1,
            limit: response.data.limit || 10,
            totalPages: response.data.totalPages || 1
        };
    }

    async getFeaturedProjects(): Promise<Project[]> {
        const response = await this.api.get('/projects/featured');
        return response.data.data || [];
    }

    async getProject(id: string): Promise<Project> {
        const response = await this.api.get<ApiResponse<Project>>(`/projects/${id}`);
        return this.extractData(response);
    }

    async createProject(projectData: CreateProjectDto): Promise<Project> {
        const response = await this.api.post<ApiResponse<Project>>('/projects', projectData);
        return this.extractData(response);
    }

    async updateProject(id: string, projectData: Partial<CreateProjectDto>): Promise<Project> {
        const response = await this.api.patch<ApiResponse<Project>>(`/projects/${id}`, projectData);
        return this.extractData(response);
    }

    async deleteProject(id: string): Promise<void> {
        await this.api.delete(`/projects/${id}`);
    }

    async getProjectStats(): Promise<any> {
        const response = await this.api.get<ApiResponse<any>>('/projects/stats');
        return this.extractData(response);
    }

    // Skills Endpoints
    async getSkills(params?: SkillQueryDto): Promise<{ data: Skill[]; total: number; page: number; limit: number; totalPages: number }> {
        try {
            const response = await this.api.get('/skills', { params });
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async getSkillById(id: string): Promise<Skill> {
        try {
            const response = await this.api.get(`/skills/${id}`);
            return response.data.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async getSkillsByCategory(category: string): Promise<Skill[]> {
        try {
            const response = await this.api.get(`/skills/category/${category}`);
            return response.data.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async getSkillStats(): Promise<any> {
        try {
            const response = await this.api.get('/skills/stats');
            return response.data.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async getSkill(id: string): Promise<Skill> {
        const response = await this.api.get<ApiResponse<Skill>>(`/skills/${id}`);
        return this.extractData(response);
    }

    async createSkill(skillData: CreateSkillDto): Promise<Skill> {
        try {
            const response = await this.api.post('/skills', skillData);
            return response.data.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async updateSkill(id: string, skillData: Partial<CreateSkillDto>): Promise<Skill> {
        try {
            const response = await this.api.patch(`/skills/${id}`, skillData);
            return response.data.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async deleteSkill(id: string): Promise<void> {
        try {
            await this.api.delete(`/skills/${id}`);
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    // Experience Endpoints
    async getExperiences(query?: ExperienceQueryDto): Promise<PaginatedResponse<Experience>> {
        const response = await this.api.get<ApiResponse<PaginatedResponse<Experience>>>('/experience', {
            params: query
        });
        return this.extractData(response);
    }

    async getExperience(id: string): Promise<Experience> {
        const response = await this.api.get<ApiResponse<Experience>>(`/experience/${id}`);
        return this.extractData(response);
    }

    async createExperience(experienceData: CreateExperienceDto): Promise<Experience> {
        const response = await this.api.post<ApiResponse<Experience>>('/experience', experienceData);
        return this.extractData(response);
    }

    async updateExperience(id: string, experienceData: Partial<CreateExperienceDto>): Promise<Experience> {
        const response = await this.api.patch<ApiResponse<Experience>>(`/experience/${id}`, experienceData);
        return this.extractData(response);
    }

    async deleteExperience(id: string): Promise<void> {
        await this.api.delete(`/experience/${id}`);
    }

    // Blog Endpoints
    async getBlogPosts(query?: BlogQueryDto): Promise<PaginatedResponse<BlogPost>> {
        const response = await this.api.get<ApiResponse<PaginatedResponse<BlogPost>>>('/blog', {
            params: query
        });
        return this.extractData(response);
    }

    async getBlogPost(id: string): Promise<BlogPost> {
        const response = await this.api.get<ApiResponse<BlogPost>>(`/blog/${id}`);
        return this.extractData(response);
    }

    async createBlogPost(blogData: CreateBlogPostDto): Promise<BlogPost> {
        const response = await this.api.post<ApiResponse<BlogPost>>('/blog', blogData);
        return this.extractData(response);
    }

    async updateBlogPost(id: string, blogData: Partial<CreateBlogPostDto>): Promise<BlogPost> {
        const response = await this.api.patch<ApiResponse<BlogPost>>(`/blog/${id}`, blogData);
        return this.extractData(response);
    }

    async deleteBlogPost(id: string): Promise<void> {
        await this.api.delete(`/blog/${id}`);
    }

    // Contact Endpoints
    async getContactMessages(query?: ContactQueryDto): Promise<PaginatedResponse<ContactMessage>> {
        const response = await this.api.get<ApiResponse<PaginatedResponse<ContactMessage>>>('/contact', {
            params: query
        });
        return this.extractData(response);
    }

    async getContactMessage(id: string): Promise<ContactMessage> {
        const response = await this.api.get<ApiResponse<ContactMessage>>(`/contact/${id}`);
        return this.extractData(response);
    }

    async createContactMessage(messageData: CreateContactMessageDto): Promise<ContactMessage> {
        const response = await this.api.post<ApiResponse<ContactMessage>>('/contact', messageData);
        return this.extractData(response);
    }

    async updateContactMessage(id: string, messageData: Partial<CreateContactMessageDto>): Promise<ContactMessage> {
        const response = await this.api.patch<ApiResponse<ContactMessage>>(`/contact/${id}`, messageData);
        return this.extractData(response);
    }

    async deleteContactMessage(id: string): Promise<void> {
        await this.api.delete(`/contact/${id}`);
    }

    // Resume Endpoints
    async getResumes(): Promise<Resume[]> {
        const response = await this.api.get<ApiResponse<Resume[]>>('/resume');
        return this.extractData(response);
    }

    async uploadResume(file: File): Promise<Resume> {
        const formData = new FormData();
        formData.append('file', file);

        const response = await this.api.post<ApiResponse<Resume>>('/resume', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return this.extractData(response);
    }

    async deleteResume(id: string): Promise<void> {
        await this.api.delete(`/resume/${id}`);
    }

    // Error handling
    private handleError(error: any): void {
        if (error.response) {
            console.error('API Error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Network Error:', error.request);
        } else {
            console.error('Error:', error.message);
        }
    }
}

// Export singleton instance
const apiService = new ApiService();
export default apiService; 