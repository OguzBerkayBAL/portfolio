import { PartialType } from '@nestjs/swagger';
import { CreateExperienceDto } from './create-experience.dto';

export class UpdateExperienceDto extends PartialType(CreateExperienceDto) {
    // All fields from CreateExperienceDto are now optional
    // PartialType makes all properties optional automatically
} 