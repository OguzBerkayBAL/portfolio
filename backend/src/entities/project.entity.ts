import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export enum ProjectStatus {
    PLANNING = 'planning',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    ARCHIVED = 'archived',
}

@Schema({
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'projects'
})
export class Project extends Document {
    @ApiProperty({ description: 'Unique identifier' })
    declare _id: string;

    @ApiProperty({ description: 'Project title', maxLength: 100 })
    @Prop({ required: true, maxlength: 100 })
    title: string;

    @ApiProperty({ description: 'Short project description' })
    @Prop({ required: true })
    description: string;

    @ApiProperty({ description: 'Detailed project description', required: false })
    @Prop()
    longDescription?: string;

    @ApiProperty({ description: 'Technologies used in the project', type: [String] })
    @Prop({ type: [String], default: [] })
    technologies: string[];

    @ApiProperty({ description: 'GitHub repository URL', required: false })
    @Prop()
    githubUrl?: string;

    @ApiProperty({ description: 'Live demo URL', required: false })
    @Prop()
    liveUrl?: string;

    @ApiProperty({ description: 'Project image URL', required: false })
    @Prop()
    imageUrl?: string;

    @ApiProperty({ description: 'Whether the project is featured' })
    @Prop({ default: false })
    featured: boolean;

    @ApiProperty({ description: 'Project status', enum: ProjectStatus })
    @Prop({
        type: String,
        enum: ProjectStatus,
        default: ProjectStatus.PLANNING
    })
    status: ProjectStatus;

    @ApiProperty({ description: 'Creation timestamp' })
    created_at: Date;

    @ApiProperty({ description: 'Last update timestamp' })
    updated_at: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project); 