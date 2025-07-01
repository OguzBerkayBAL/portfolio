import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export enum SkillCategory {
    FRONTEND = 'frontend',
    BACKEND = 'backend',
    DATABASE = 'database',
    DEVOPS = 'devops',
    DESIGN = 'design',
    TOOLS = 'tools',
}

export enum SkillLevel {
    BEGINNER = 1,
    INTERMEDIATE = 2,
    ADVANCED = 3,
    EXPERT = 4,
}

@Schema({ collection: 'skills' })
export class Skill extends Document {
    @ApiProperty({ description: 'Unique identifier' })
    declare _id: string;

    @ApiProperty({ description: 'Skill name', maxLength: 50 })
    @Prop({ required: true, maxlength: 50 })
    name: string;

    @ApiProperty({ description: 'Skill category', enum: SkillCategory })
    @Prop({
        type: String,
        enum: SkillCategory,
        required: true
    })
    category: SkillCategory;

    @ApiProperty({ description: 'Skill level from 1 to 4', minimum: 1, maximum: 4 })
    @Prop({ type: Number, min: 1, max: 4, required: true })
    level: SkillLevel;

    @ApiProperty({ description: 'Icon name or URL', required: false })
    @Prop()
    icon?: string;

    @ApiProperty({ description: 'Color for UI representation', required: false })
    @Prop({ maxlength: 7 })
    color?: string;

    @ApiProperty({ description: 'Display order within category' })
    @Prop({ default: 0 })
    order: number;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);

// Index for category and order
SkillSchema.index({ category: 1, order: 1 }); 