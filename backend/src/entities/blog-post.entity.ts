import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('blog_posts')
@Index(['published', 'createdAt'])
@Index(['slug'], { unique: true })
export class BlogPost {
    @ApiProperty({ description: 'Unique identifier' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Blog post title', maxLength: 200 })
    @Column({ length: 200 })
    title: string;

    @ApiProperty({ description: 'URL-friendly slug' })
    @Column({ unique: true })
    slug: string;

    @ApiProperty({ description: 'Short excerpt of the post' })
    @Column('text')
    excerpt: string;

    @ApiProperty({ description: 'Full blog post content in markdown' })
    @Column('text')
    content: string;

    @ApiProperty({ description: 'Post tags', type: [String] })
    @Column('text', { array: true, default: [] })
    tags: string[];

    @ApiProperty({ description: 'Whether the post is published' })
    @Column({ default: false })
    published: boolean;

    @ApiProperty({ description: 'Featured image URL', required: false })
    @Column({ nullable: true, name: 'featured_image' })
    featuredImage?: string;

    @ApiProperty({ description: 'Estimated reading time in minutes' })
    @Column({ default: 5, name: 'read_time' })
    readTime: number;

    @ApiProperty({ description: 'Creation timestamp' })
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ApiProperty({ description: 'Last update timestamp' })
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
} 