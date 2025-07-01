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
exports.BlogPost = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let BlogPost = class BlogPost {
    id;
    title;
    slug;
    excerpt;
    content;
    tags;
    published;
    featuredImage;
    readTime;
    createdAt;
    updatedAt;
};
exports.BlogPost = BlogPost;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BlogPost.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Blog post title', maxLength: 200 }),
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], BlogPost.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL-friendly slug' }),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], BlogPost.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Short excerpt of the post' }),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], BlogPost.prototype, "excerpt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Full blog post content in markdown' }),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], BlogPost.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Post tags', type: [String] }),
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], BlogPost.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the post is published' }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], BlogPost.prototype, "published", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Featured image URL', required: false }),
    (0, typeorm_1.Column)({ nullable: true, name: 'featured_image' }),
    __metadata("design:type", String)
], BlogPost.prototype, "featuredImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Estimated reading time in minutes' }),
    (0, typeorm_1.Column)({ default: 5, name: 'read_time' }),
    __metadata("design:type", Number)
], BlogPost.prototype, "readTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation timestamp' }),
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], BlogPost.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last update timestamp' }),
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], BlogPost.prototype, "updatedAt", void 0);
exports.BlogPost = BlogPost = __decorate([
    (0, typeorm_1.Entity)('blog_posts'),
    (0, typeorm_1.Index)(['published', 'createdAt']),
    (0, typeorm_1.Index)(['slug'], { unique: true })
], BlogPost);
//# sourceMappingURL=blog-post.entity.js.map