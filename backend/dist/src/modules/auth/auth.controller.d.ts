import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User, UserRole } from '../../entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        success: boolean;
        message: string;
        data: import("./auth.service").AuthResponse;
        timestamp: string;
        system: {
            status: string;
            security_level: string;
            module: string;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        success: boolean;
        message: string;
        data: import("./auth.service").AuthResponse;
        timestamp: string;
        system: {
            status: string;
            security_level: string;
            module: string;
            remember_session: boolean;
        };
    }>;
    refreshToken(refreshToken: string): Promise<{
        success: boolean;
        message: string;
        data: import("./auth.service").AuthResponse;
        timestamp: string;
        system: {
            status: string;
            security_level: string;
        };
    }>;
    getProfile(user: User): Promise<{
        success: boolean;
        message: string;
        data: Omit<User, "password" | "isActive" | "resetPasswordToken" | "emailVerificationToken" | "hashPassword" | "validatePassword" | "fullName" | "isLocked" | "toSafeObject">;
        timestamp: string;
        system: {
            status: string;
            user_id: number;
            security_level: string;
        };
    }>;
    changePassword(user: User, changePasswordDto: ChangePasswordDto): Promise<{
        success: boolean;
        message: string;
        timestamp: string;
        system: {
            status: string;
            user_id: number;
            security_level: string;
        };
    }>;
    logout(user: User): Promise<{
        success: boolean;
        message: string;
        timestamp: string;
        system: {
            status: string;
            user_id: number;
            security_level: string;
        };
    }>;
    getUserStats(user: User): Promise<{
        success: boolean;
        message: string;
        data: {
            total: number;
            active: number;
            pending: number;
            suspended: number;
            recentRegistrations: number;
        };
        timestamp: string;
        system: {
            status: string;
            accessed_by: string;
            security_level: string;
        };
    }>;
    validateToken(user: User): Promise<{
        success: boolean;
        message: string;
        data: {
            valid: boolean;
            user: {
                id: number;
                username: string;
                role: UserRole;
                status: import("../../entities/user.entity").UserStatus;
            };
        };
        timestamp: string;
        system: {
            status: string;
            security_level: string;
        };
    }>;
}
