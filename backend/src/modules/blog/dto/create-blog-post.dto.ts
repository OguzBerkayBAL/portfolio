import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, IsBoolean, MaxLength, MinLength } from 'class-validator';

export class CreateBlogPostDto {
    @ApiProperty({
        description: 'Blog post title',
        example: 'Building a Cyberpunk Portfolio with NestJS and React',
        maxLength: 200,
        minLength: 5
    })
    @IsString()
    @MinLength(5)
    @MaxLength(200)
    title: string;

    @ApiProperty({
        description: 'URL-friendly slug (auto-generated if not provided)',
        example: 'building-cyberpunk-portfolio-nestjs-react',
        required: false,
        maxLength: 250
    })
    @IsOptional()
    @IsString()
    @MaxLength(250)
    slug?: string;

    @ApiProperty({
        description: 'Short excerpt of the blog post',
        example: 'Learn how to create a dark-themed portfolio website with modern web technologies...',
        maxLength: 500
    })
    @IsString()
    @MaxLength(500)
    excerpt: string;

    @ApiProperty({
        description: 'Full blog post content in Markdown format',
        example: '# Introduction\n\nIn this comprehensive guide, we\'ll explore...\n\n## Technologies Used\n\n- NestJS\n- React\n- TypeScript'
    })
    @IsString()
    content: string;

    @ApiProperty({
        description: 'Blog post tags for categorization',
        example: ['NestJS', 'React', 'TypeScript', 'Portfolio', 'Dark Theme'],
        type: [String],
        required: false
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];

    @ApiProperty({
        description: 'Whether the blog post is published',
        example: false,
        default: false
    })
    @IsOptional()
    @IsBoolean()
    published?: boolean;

    @ApiProperty({
        description: 'Featured image URL for the blog post',
        example: 'https://example.com/images/cyberpunk-portfolio-cover.jpg',
        required: false,
        maxLength: 500
    })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    featuredImage?: string;

    @ApiProperty({
        description: 'Meta description for SEO',
        example: 'Complete guide to building a cyberpunk-themed portfolio website using NestJS backend and React frontend with TypeScript.',
        required: false,
        maxLength: 160
    })
    @IsOptional()
    @IsString()
    @MaxLength(160)
    metaDescription?: string;

    @ApiProperty({
        description: 'Reading time in minutes (auto-calculated if not provided)',
        example: 8,
        required: false
    })
    @IsOptional()
    readTime?: number;
} 