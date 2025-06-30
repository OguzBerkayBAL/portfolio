import { PartialType } from '@nestjs/swagger';
import { CreateBlogPostDto } from './create-blog-post.dto';

export class UpdateBlogPostDto extends PartialType(CreateBlogPostDto) {
    // All fields from CreateBlogPostDto are now optional
    // PartialType makes all properties optional automatically
} 