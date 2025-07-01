import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum ProjectStatus {
    PLANNING = 'planning',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    ARCHIVED = 'archived',
}

@Entity('projects')
@Index(['featured', 'status'])
export class Project {
    @ApiProperty({ description: 'Unique identifier' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Project title', maxLength: 100 })
    @Column({ length: 100 })
    title: string;

    @ApiProperty({ description: 'Short project description' })
    @Column('text')
    description: string;

    @ApiProperty({ description: 'Detailed project description', required: false })
    @Column('text', { nullable: true, name: 'long_description' })
    longDescription?: string;

    @ApiProperty({ description: 'Technologies used in the project', type: [String] })
    @Column('text', { array: true })
    technologies: string[];

    @ApiProperty({ description: 'GitHub repository URL', required: false })
    @Column({ nullable: true, name: 'github_url' })
    githubUrl?: string;

    @ApiProperty({ description: 'Live demo URL', required: false })
    @Column({ nullable: true, name: 'live_url' })
    liveUrl?: string;

    @ApiProperty({ description: 'Project image URL', required: false })
    @Column({ nullable: true, name: 'image_url' })
    imageUrl?: string;

    @ApiProperty({ description: 'Whether the project is featured' })
    @Column({ default: false })
    featured: boolean;

    @ApiProperty({ description: 'Project status', enum: ProjectStatus })
    @Column({
        type: 'enum',
        enum: ProjectStatus,
        default: ProjectStatus.PLANNING,
    })
    status: ProjectStatus;

    @ApiProperty({ description: 'Creation timestamp' })
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ApiProperty({ description: 'Last update timestamp' })
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
} 