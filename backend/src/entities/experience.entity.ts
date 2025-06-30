import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('experiences')
@Index(['current', 'startDate'])
export class Experience {
    @ApiProperty({ description: 'Unique identifier' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Job title', maxLength: 100 })
    @Column({ length: 100 })
    title: string;

    @ApiProperty({ description: 'Company name', maxLength: 100 })
    @Column({ length: 100 })
    company: string;

    @ApiProperty({ description: 'Work location', required: false })
    @Column({ nullable: true })
    location?: string;

    @ApiProperty({ description: 'Employment start date' })
    @Column('date', { name: 'start_date' })
    startDate: Date;

    @ApiProperty({ description: 'Employment end date', required: false })
    @Column('date', { nullable: true, name: 'end_date' })
    endDate?: Date;

    @ApiProperty({ description: 'Whether this is current employment' })
    @Column({ default: false })
    current: boolean;

    @ApiProperty({ description: 'Job description' })
    @Column('text')
    description: string;

    @ApiProperty({ description: 'Technologies used', type: [String] })
    @Column('text', { array: true, default: [] })
    technologies: string[];

    @ApiProperty({ description: 'Key achievements', type: [String] })
    @Column('text', { array: true, default: [] })
    achievements: string[];
} 