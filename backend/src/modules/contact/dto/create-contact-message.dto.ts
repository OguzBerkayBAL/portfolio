import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateContactMessageDto {
    @ApiProperty({
        description: 'Sender full name',
        example: 'Berkay Demir',
        maxLength: 100
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @ApiProperty({
        description: 'Sender email address',
        example: 'berkay@darktech.dev',
        format: 'email'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Message subject',
        example: 'Project Collaboration Inquiry',
        maxLength: 200
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    subject: string;

    @ApiProperty({
        description: 'Message content',
        example: 'Hi! I would like to discuss a potential collaboration on a cyberpunk-themed web project...'
    })
    @IsString()
    @IsNotEmpty()
    message: string;
} 