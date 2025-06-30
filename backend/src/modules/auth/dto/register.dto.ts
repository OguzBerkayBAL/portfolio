import { IsEmail, IsString, IsOptional, MinLength, MaxLength, Matches, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({
        description: 'Unique username for system access',
        example: 'cyberpunk_dev',
        minLength: 3,
        maxLength: 50
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'Username must be at least 3 characters long' })
    @MaxLength(50, { message: 'Username cannot exceed 50 characters' })
    @Matches(/^[a-zA-Z0-9_-]+$/, {
        message: 'Username can only contain letters, numbers, underscores and hyphens'
    })
    username: string;

    @ApiProperty({
        description: 'Valid email address for account verification',
        example: 'berkay@cybersec.dev'
    })
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Secure password (min 8 chars, must include uppercase, lowercase, number)',
        example: 'CyberPunk2024!',
        minLength: 8
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    })
    password: string;

    @ApiProperty({
        description: 'Confirm password (must match password)',
        example: 'CyberPunk2024!'
    })
    @IsString()
    @IsNotEmpty()
    confirmPassword: string;

    @ApiPropertyOptional({
        description: 'User first name',
        example: 'Berkay',
        maxLength: 100
    })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    firstName?: string;

    @ApiPropertyOptional({
        description: 'User last name',
        example: 'Özkan',
        maxLength: 100
    })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    lastName?: string;
} 