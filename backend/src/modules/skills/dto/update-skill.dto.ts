import { PartialType } from '@nestjs/swagger';
import { CreateSkillDto } from './create-skill.dto';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {
    // All fields from CreateSkillDto are now optional
    // PartialType makes all properties optional automatically
} 