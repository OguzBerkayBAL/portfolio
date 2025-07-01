export interface PersonalInfo {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    website?: string;
    linkedin?: string;
    github?: string;
}
export interface Education {
    degree: string;
    school: string;
    year: string;
    gpa?: string;
    description?: string;
}
export interface WorkExperience {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate?: string;
    description: string;
    technologies?: string[];
    achievements?: string[];
}
export interface ResumeSkill {
    category: string;
    skills: string[];
}
export interface ResumeProject {
    name: string;
    description: string;
    technologies: string[];
    url?: string;
    github?: string;
}
export interface Language {
    name: string;
    level: string;
}
export interface Certification {
    name: string;
    issuer: string;
    date: string;
    credentialId?: string;
    url?: string;
}
export declare class Resume {
    id: number;
    version: string;
    personalInfo: PersonalInfo;
    education: Education[];
    experience: WorkExperience[];
    skills: ResumeSkill[];
    projects: ResumeProject[];
    languages: Language[];
    certifications: Certification[];
    isActive: boolean;
    customSections?: string;
    template: string;
    createdAt: Date;
    updatedAt: Date;
}
