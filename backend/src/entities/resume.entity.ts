import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

@Schema({
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'resumes'
})
export class Resume extends Document {
    @Prop({ required: true, unique: true, maxlength: 100 })
    version: string;

    @Prop({ type: Object, required: true })
    personalInfo: PersonalInfo;

    @Prop({ type: Array, default: [] })
    education: Education[];

    @Prop({ type: Array, default: [] })
    experience: WorkExperience[];

    @Prop({ type: Array, default: [] })
    skills: ResumeSkill[];

    @Prop({ type: Array, default: [] })
    projects: ResumeProject[];

    @Prop({ type: Array, default: [] })
    languages: Language[];

    @Prop({ type: Array, default: [] })
    certifications: Certification[];

    @Prop({ default: true })
    isActive: boolean;

    @Prop() // JSON string for additional sections
    customSections?: string;

    @Prop({ maxlength: 20, default: 'modern' }) // Template style: modern, classic, cyberpunk
    template: string;

    created_at: Date;
    updated_at: Date;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume); 