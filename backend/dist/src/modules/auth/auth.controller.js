"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const register_dto_1 = require("./dto/register.dto");
const login_dto_1 = require("./dto/login.dto");
const change_password_dto_1 = require("./dto/change-password.dto");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const roles_guard_1 = require("./guards/roles.guard");
const public_decorator_1 = require("./decorators/public.decorator");
const current_user_decorator_1 = require("./decorators/current-user.decorator");
const roles_decorator_1 = require("./decorators/roles.decorator");
const user_entity_1 = require("../../entities/user.entity");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(registerDto) {
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
    async login(loginDto) {
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
    async refreshToken(refreshToken) {
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('Refresh token is required');
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
    async getProfile(user) {
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
    async changePassword(user, changePasswordDto) {
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
    async logout(user) {
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
    async getUserStats(user) {
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
    async validateToken(user) {
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
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({
        summary: '👤 User Registration',
        description: 'Initialize new user account in the security matrix'
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '🔓 System Login',
        description: 'Authenticate user and establish secure session'
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '❌ Authentication failed'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '🔄 Token Refresh',
        description: 'Refresh access token using refresh token'
    }),
    (0, swagger_1.ApiBody)({
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '✅ Token refreshed successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '❌ Invalid refresh token'
    }),
    __param(0, (0, common_1.Body)('refresh_token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: '👤 Get User Profile',
        description: 'Retrieve current user profile information'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '✅ Profile retrieved successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '❌ Authentication required'
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Patch)('change-password'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: '🔑 Change Password',
        description: 'Update user password with current password verification'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '✅ Password changed successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '❌ Current password incorrect'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        change_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: '🚪 System Logout',
        description: 'Terminate current user session'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '✅ Logout successful'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.MODERATOR),
    (0, swagger_1.ApiOperation)({
        summary: '📊 User Statistics',
        description: 'Get comprehensive user statistics (Admin/Moderator only)'
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: '❌ Insufficient privileges'
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUserStats", null);
__decorate([
    (0, common_1.Get)('validate'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: '✅ Token Validation',
        description: 'Validate current authentication token'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '✅ Token is valid'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '❌ Token is invalid'
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validateToken", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('🔐 Security System'),
    (0, common_1.Controller)('auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map