import {
    Controller,
    Post,
    Body,
    Get,
    Patch,
    UseGuards,
    HttpCode,
    HttpStatus,
    Request,
    UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { Roles } from './decorators/roles.decorator';
import { User, UserRole } from '../../entities/user.entity';

@ApiTags('🔐 Security System')
@Controller('auth')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('register')
    @ApiOperation({
        summary: '👤 User Registration',
        description: 'Initialize new user account in the security matrix'
    })
    @ApiResponse({
        status: 201,
        description: '✅ User registered successfully',
        schema: {
            example: {
                success: true,
                message: '👤 User account initialized successfully',
                data: {
                    user: {
                        id: 1,
                        username: 'cyberpunk_dev',
                        email: 'berkay@cybersec.dev',
                        role: 'user',
                        status: 'pending'
                    },
                    tokens: {
                        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                        refresh_token: null
                    },
                    session: {
                        expiresIn: 86400,
                        issuedAt: 1640995200000,
                        rememberMe: false
                    }
                },
                timestamp: '2024-01-15T10:30:00.000Z',
                system: {
                    status: 'USER_CREATED',
                    security_level: 'AUTHENTICATED'
                }
            }
        }
    })
    @ApiResponse({
        status: 409,
        description: '⚠️ User already exists',
        schema: {
            example: {
                success: false,
                error: 'CONFLICT',
                message: '⚠️ Username or email already exists',
                timestamp: '2024-01-15T10:30:00.000Z'
            }
        }
    })
    async register(@Body() registerDto: RegisterDto) {
        const result = await this.authService.register(registerDto);

        return {
            success: true,
            message: '👤 User account initialized successfully',
            data: result,
            timestamp: new Date().toISOString(),
            system: {
                status: 'USER_CREATED',
                security_level: 'AUTHENTICATED',
                module: 'AUTH_MATRIX'
            }
        };
    }

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '🔓 System Login',
        description: 'Authenticate user and establish secure session'
    })
    @ApiResponse({
        status: 200,
        description: '✅ Authentication successful',
        schema: {
            example: {
                success: true,
                message: '🔓 Access granted - Welcome to the Matrix',
                data: {
                    user: {
                        id: 1,
                        username: 'cyberpunk_dev',
                        email: 'berkay@cybersec.dev',
                        role: 'user',
                        status: 'active'
                    },
                    tokens: {
                        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                        refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                    },
                    session: {
                        expiresIn: 86400,
                        issuedAt: 1640995200000,
                        rememberMe: true
                    }
                },
                timestamp: '2024-01-15T10:30:00.000Z',
                system: {
                    status: 'SESSION_ESTABLISHED',
                    security_level: 'AUTHENTICATED'
                }
            }
        }
    })
    @ApiResponse({
        status: 401,
        description: '❌ Authentication failed'
    })
    async login(@Body() loginDto: LoginDto) {
        const result = await this.authService.login(loginDto);

        return {
            success: true,
            message: '🔓 Access granted - Welcome to the Matrix',
            data: result,
            timestamp: new Date().toISOString(),
            system: {
                status: 'SESSION_ESTABLISHED',
                security_level: 'AUTHENTICATED',
                module: 'AUTH_MATRIX',
                remember_session: result.session.rememberMe
            }
        };
    }

    @Public()
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '🔄 Token Refresh',
        description: 'Refresh access token using refresh token'
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                refresh_token: {
                    type: 'string',
                    description: 'Valid refresh token',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                }
            },
            required: ['refresh_token']
        }
    })
    @ApiResponse({
        status: 200,
        description: '✅ Token refreshed successfully'
    })
    @ApiResponse({
        status: 401,
        description: '❌ Invalid refresh token'
    })
    async refreshToken(@Body('refresh_token') refreshToken: string) {
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token is required');
        }

        const result = await this.authService.refreshToken(refreshToken);

        return {
            success: true,
            message: '🔄 Token refreshed successfully',
            data: result,
            timestamp: new Date().toISOString(),
            system: {
                status: 'TOKEN_RENEWED',
                security_level: 'AUTHENTICATED'
            }
        };
    }

    @Get('profile')
    @ApiBearerAuth()
    @ApiOperation({
        summary: '👤 Get User Profile',
        description: 'Retrieve current user profile information'
    })
    @ApiResponse({
        status: 200,
        description: '✅ Profile retrieved successfully'
    })
    @ApiResponse({
        status: 401,
        description: '❌ Authentication required'
    })
    async getProfile(@CurrentUser() user: User) {
        const profile = await this.authService.getProfile(user.id);

        return {
            success: true,
            message: '👤 User profile retrieved',
            data: profile.toSafeObject(),
            timestamp: new Date().toISOString(),
            system: {
                status: 'PROFILE_ACCESSED',
                user_id: user.id,
                security_level: 'AUTHENTICATED'
            }
        };
    }

    @Patch('change-password')
    @ApiBearerAuth()
    @ApiOperation({
        summary: '🔑 Change Password',
        description: 'Update user password with current password verification'
    })
    @ApiResponse({
        status: 200,
        description: '✅ Password changed successfully'
    })
    @ApiResponse({
        status: 401,
        description: '❌ Current password incorrect'
    })
    @HttpCode(HttpStatus.OK)
    async changePassword(
        @CurrentUser() user: User,
        @Body() changePasswordDto: ChangePasswordDto
    ) {
        await this.authService.changePassword(user.id, changePasswordDto);

        return {
            success: true,
            message: '🔑 Password updated successfully',
            timestamp: new Date().toISOString(),
            system: {
                status: 'PASSWORD_UPDATED',
                user_id: user.id,
                security_level: 'HIGH'
            }
        };
    }

    @Post('logout')
    @ApiBearerAuth()
    @ApiOperation({
        summary: '🚪 System Logout',
        description: 'Terminate current user session'
    })
    @ApiResponse({
        status: 200,
        description: '✅ Logout successful'
    })
    @HttpCode(HttpStatus.OK)
    async logout(@CurrentUser() user: User) {
        await this.authService.logout(user.id);

        return {
            success: true,
            message: '🚪 Session terminated - Goodbye',
            timestamp: new Date().toISOString(),
            system: {
                status: 'SESSION_TERMINATED',
                user_id: user.id,
                security_level: 'ANONYMOUS'
            }
        };
    }

    @Get('stats')
    @ApiBearerAuth()
    @Roles(UserRole.ADMIN, UserRole.MODERATOR)
    @ApiOperation({
        summary: '📊 User Statistics',
        description: 'Get comprehensive user statistics (Admin/Moderator only)'
    })
    @ApiResponse({
        status: 200,
        description: '✅ Statistics retrieved successfully',
        schema: {
            example: {
                success: true,
                message: '📊 User statistics compiled',
                data: {
                    total: 150,
                    active: 120,
                    pending: 25,
                    suspended: 5,
                    recentRegistrations: 15
                },
                timestamp: '2024-01-15T10:30:00.000Z'
            }
        }
    })
    @ApiResponse({
        status: 403,
        description: '❌ Insufficient privileges'
    })
    async getUserStats(@CurrentUser() user: User) {
        const stats = await this.authService.getUserStats();

        return {
            success: true,
            message: '📊 User statistics compiled',
            data: stats,
            timestamp: new Date().toISOString(),
            system: {
                status: 'STATS_ACCESSED',
                accessed_by: user.username,
                security_level: 'ADMIN'
            }
        };
    }

    @Get('validate')
    @ApiBearerAuth()
    @ApiOperation({
        summary: '✅ Token Validation',
        description: 'Validate current authentication token'
    })
    @ApiResponse({
        status: 200,
        description: '✅ Token is valid'
    })
    @ApiResponse({
        status: 401,
        description: '❌ Token is invalid'
    })
    async validateToken(@CurrentUser() user: User) {
        return {
            success: true,
            message: '✅ Authentication token is valid',
            data: {
                valid: true,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    status: user.status
                }
            },
            timestamp: new Date().toISOString(),
            system: {
                status: 'TOKEN_VALIDATED',
                security_level: 'AUTHENTICATED'
            }
        };
    }
} 