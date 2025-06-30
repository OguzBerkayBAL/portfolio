import { IsString, IsNotEmpty, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
    @ApiProperty({
        description: 'Current password for verification',
        example: 'OldPassword123!'
    })
    @IsString()
    @IsNotEmpty()
    currentPassword: string;

    @ApiProperty({
        description: 'New secure password (min 8 chars, must include uppercase, lowercase, number)',
        example: 'NewCyberPunk2024!',
        minLength: 8
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    })
    newPassword: string;

    @ApiProperty({
        description: 'Confirm new password (must match new password)',
        example: 'NewCyberPunk2024!'
    })
    @IsString()
    @IsNotEmpty()
    confirmPassword: string;
} 