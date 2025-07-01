"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBlogPostDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateBlogPostDto {
    title;
    slug;
    excerpt;
    content;
    tags;
    published;
    featuredImage;
    metaDescription;
    readTime;
}
exports.CreateBlogPostDto = CreateBlogPostDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Blog post title',
        example: 'Building a Cyberpunk Portfolio with NestJS and React',
        maxLength: 200,
        minLength: 5
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateBlogPostDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL-friendly slug (auto-generated if not provided)',
        example: 'building-cyberpunk-portfolio-nestjs-react',
        required: false,
        maxLength: 250
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(250),
    __metadata("design:type", String)
], CreateBlogPostDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Short excerpt of the blog post',
        example: 'Learn how to create a dark-themed portfolio website with modern web technologies...',
        maxLength: 500
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateBlogPostDto.prototype, "excerpt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Full blog post content in Markdown format',
        example: '# Introduction\n\nIn this comprehensive guide, we\'ll explore...\n\n## Technologies Used\n\n- NestJS\n- React\n- TypeScript'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBlogPostDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Blog post tags for categorization',
        example: ['NestJS', 'React', 'TypeScript', 'Portfolio', 'Dark Theme'],
        type: [String],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateBlogPostDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the blog post is published',
        example: false,
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateBlogPostDto.prototype, "published", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Featured image URL for the blog post',
        example: 'https://example.com/images/cyberpunk-portfolio-cover.jpg',
        required: false,
        maxLength: 500
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateBlogPostDto.prototype, "featuredImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Meta description for SEO',
        example: 'Complete guide to building a cyberpunk-themed portfolio website using NestJS backend and React frontend with TypeScript.',
        required: false,
        maxLength: 160
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(160),
    __metadata("design:type", String)
], CreateBlogPostDto.prototype, "metaDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reading time in minutes (auto-calculated if not provided)',
        example: 8,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateBlogPostDto.prototype, "readTime", void 0);
//# sourceMappingURL=create-blog-post.dto.js.map