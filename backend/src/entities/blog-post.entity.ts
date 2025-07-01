import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'blog_posts'
})
export class BlogPost extends Document {
    @ApiProperty({ description: 'Unique identifier' })
    declare _id: string;

    @ApiProperty({ description: 'Blog post title', maxLength: 200 })
    @Prop({ required: true, maxlength: 200 })
    title: string;

    @ApiProperty({ description: 'URL-friendly slug' })
    @Prop({ required: true, unique: true })
    slug: string;

    @ApiProperty({ description: 'Short excerpt of the post' })
    @Prop({ required: true })
    excerpt: string;

    @ApiProperty({ description: 'Full blog post content in markdown' })
    @Prop({ required: true })
    content: string;

    @ApiProperty({ description: 'Post tags', type: [String] })
    @Prop({ type: [String], default: [] })
    tags: string[];

    @ApiProperty({ description: 'Whether the post is published' })
    @Prop({ default: false })
    published: boolean;

    @ApiProperty({ description: 'Featured image URL', required: false })
    @Prop()
    featuredImage?: string;

    @ApiProperty({ description: 'Estimated reading time in minutes' })
    @Prop({ default: 5 })
    readTime: number;

    @ApiProperty({ description: 'Creation timestamp' })
    created_at: Date;

    @ApiProperty({ description: 'Last update timestamp' })
    updated_at: Date;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);

// Indexes
BlogPostSchema.index({ published: 1, created_at: -1 });
BlogPostSchema.index({ slug: 1 }, { unique: true }); 