import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
} from 'typeorm';
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

@Entity('skills')
@Index(['category', 'order'])
export class Skill {
    @ApiProperty({ description: 'Unique identifier' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Skill name', maxLength: 50 })
    @Column({ length: 50 })
    name: string;

    @ApiProperty({ description: 'Skill category', enum: SkillCategory })
    @Column({
        type: 'enum',
        enum: SkillCategory,
    })
    category: SkillCategory;

    @ApiProperty({ description: 'Skill level from 1 to 4', minimum: 1, maximum: 4 })
    @Column('int')
    level: SkillLevel;

    @ApiProperty({ description: 'Icon name or URL', required: false })
    @Column({ nullable: true })
    icon?: string;

    @ApiProperty({ description: 'Color for UI representation', required: false })
    @Column({ length: 7, nullable: true })
    color?: string;

    @ApiProperty({ description: 'Display order within category' })
    @Column({ default: 0 })
    order: number;
} 