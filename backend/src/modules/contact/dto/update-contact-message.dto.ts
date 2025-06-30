import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsDateString } from 'class-validator';
import { MessageStatus } from '../../../entities/contact-message.entity';

export class UpdateContactMessageDto {
  @ApiProperty({
    description: 'Message status',
    enum: MessageStatus,
    required: false
  })
  @IsOptional()
  @IsEnum(MessageStatus)
  status?: MessageStatus;

  @ApiProperty({
    description: 'Message read timestamp',
    example: '2025-06-22T10:30:00Z',
    required: false
  })
  @IsOptional()
  @IsDateString()
  readAt?: Date;
} 