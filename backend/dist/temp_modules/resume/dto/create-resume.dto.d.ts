export declare class PersonalInfoDto {
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
export declare class EducationDto {
    degree: string;
    school: string;
    year: string;
    gpa?: string;
    description?: string;
}
export declare class WorkExperienceDto {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate?: string;
    description: string;
    technologies?: string[];
    achievements?: string[];
}
export declare class ResumeSkillDto {
    category: string;
    skills: string[];
}
export declare class ResumeProjectDto {
    name: string;
    description: string;
    technologies: string[];
    url?: string;
    github?: string;
}
export declare class LanguageDto {
    name: string;
    level: string;
}
export declare class CertificationDto {
    name: string;
    issuer: string;
    date: string;
    credentialId?: string;
    url?: string;
}
export declare class CreateResumeDto {
    version: string;
    personalInfo: PersonalInfoDto;
    education?: EducationDto[];
    experience?: WorkExperienceDto[];
    skills?: ResumeSkillDto[];
    projects?: ResumeProjectDto[];
    languages?: LanguageDto[];
    certifications?: CertificationDto[];
    isActive?: boolean;
    customSections?: string;
    template?: string;
}
