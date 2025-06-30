import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({
        description: 'Username or email address for authentication',
        example: 'cyberpunk_dev'
    })
    @IsString()
    @IsNotEmpty()
    usernameOrEmail: string;

    @ApiProperty({
        description: 'User password',
        example: 'CyberPunk2024!'
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiPropertyOptional({
        description: 'Remember this session (extends token expiry)',
        example: true,
        default: false
    })
    @IsOptional()
    @IsBoolean()
    rememberMe?: boolean;
} 