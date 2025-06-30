import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    // All fields from CreateProjectDto are now optional
    // PartialType makes all properties optional automatically
} 