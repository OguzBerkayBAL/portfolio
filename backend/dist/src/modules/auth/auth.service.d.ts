import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export interface JwtPayload {
    sub: number;
    username: string;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}
export interface AuthResponse {
    user: Partial<User>;
    tokens: {
        access_token: string;
        refresh_token?: string;
    };
    session: {
        expiresIn: number;
        issuedAt: number;
        rememberMe: boolean;
    };
}
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<AuthResponse>;
    login(loginDto: LoginDto): Promise<AuthResponse>;
    validateUser(payload: JwtPayload): Promise<User>;
    refreshToken(refreshToken: string): Promise<AuthResponse>;
    changePassword(userId: number, changePasswordDto: ChangePasswordDto): Promise<void>;
    logout(userId: number): Promise<void>;
    getProfile(userId: number): Promise<User>;
    private generateTokens;
    private incrementLoginAttempts;
    private resetLoginAttempts;
    private updateLastLogin;
    private generateToken;
    getUserStats(): Promise<{
        total: number;
        active: number;
        pending: number;
        suspended: number;
        recentRegistrations: number;
    }>;
}
