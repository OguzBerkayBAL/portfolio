import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ collection: 'experiences' })
export class Experience extends Document {
    @ApiProperty({ description: 'Unique identifier' })
    declare _id: string;

    @ApiProperty({ description: 'Job title', maxLength: 100 })
    @Prop({ required: true, maxlength: 100 })
    title: string;

    @ApiProperty({ description: 'Company name', maxLength: 100 })
    @Prop({ required: true, maxlength: 100 })
    company: string;

    @ApiProperty({ description: 'Work location', required: false })
    @Prop()
    location?: string;

    @ApiProperty({ description: 'Employment start date' })
    @Prop({ required: true, type: Date })
    startDate: Date;

    @ApiProperty({ description: 'Employment end date', required: false })
    @Prop({ type: Date })
    endDate?: Date;

    @ApiProperty({ description: 'Whether this is current employment' })
    @Prop({ default: false })
    current: boolean;

    @ApiProperty({ description: 'Job description' })
    @Prop({ required: true })
    description: string;

    @ApiProperty({ description: 'Technologies used', type: [String] })
    @Prop({ type: [String], default: [] })
    technologies: string[];

    @ApiProperty({ description: 'Key achievements', type: [String] })
    @Prop({ type: [String], default: [] })
    achievements: string[];
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);

// Index for current and startDate
ExperienceSchema.index({ current: -1, startDate: -1 }); 