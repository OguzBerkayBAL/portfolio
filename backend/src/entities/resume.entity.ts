import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

@Entity('resumes')
export class Resume {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    version: string;

    @Column({ type: 'jsonb', name: 'personal_info' })
    personalInfo: PersonalInfo;

    @Column({ type: 'jsonb', default: [] })
    education: Education[];

    @Column({ type: 'jsonb', default: [] })
    experience: WorkExperience[];

    @Column({ type: 'jsonb', default: [] })
    skills: ResumeSkill[];

    @Column({ type: 'jsonb', default: [] })
    projects: ResumeProject[];

    @Column({ type: 'jsonb', default: [] })
    languages: Language[];

    @Column({ type: 'jsonb', default: [] })
    certifications: Certification[];

    @Column({ type: 'boolean', default: true, name: 'is_active' })
    isActive: boolean;

    @Column({ type: 'text', nullable: true, name: 'custom_sections' })
    customSections?: string; // JSON string for additional sections

    @Column({ type: 'varchar', length: 20, default: 'modern' })
    template: string; // Template style: modern, classic, cyberpunk

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
} 