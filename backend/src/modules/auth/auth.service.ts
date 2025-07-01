import { Injectable, UnauthorizedException, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User, UserRole, UserStatus } from '../../entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

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

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async register(registerDto: RegisterDto): Promise<AuthResponse> {
        const { username, email, password, confirmPassword, firstName, lastName } = registerDto;

        // Validate password confirmation
        if (password !== confirmPassword) {
            throw new BadRequestException('Passwords do not match');
        }

        // Check if user already exists
        const existingUser = await this.userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (existingUser) {
            if (existingUser.username === username) {
                throw new ConflictException('Username already exists');
            }
            if (existingUser.email === email) {
                throw new ConflictException('Email already exists');
            }
        }

        // Create new user
        const user = new this.userModel({
            username,
            email,
            password, // Will be hashed by the entity
            firstName,
            lastName,
            emailVerificationToken: this.generateToken(),
            status: UserStatus.PENDING // Require email verification
        });

        const savedUser = await user.save();

        // Generate tokens
        const tokens = await this.generateTokens(savedUser, false);

        return {
            user: savedUser.toSafeObject(),
            tokens,
            session: {
                expiresIn: 86400, // 24 hours
                issuedAt: Date.now(),
                rememberMe: false
            }
        };
    }

    async login(loginDto: LoginDto): Promise<AuthResponse> {
        const { usernameOrEmail, password, rememberMe = false } = loginDto;

        // Find user by username or email
        const user = await this.userModel.findOne({
            $or: [
                { username: usernameOrEmail },
                { email: usernameOrEmail }
            ]
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Check if user is locked
        if (user.isLocked) {
            throw new UnauthorizedException('Account is temporarily locked due to multiple failed attempts');
        }

        // Validate password
        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            // Increment login attempts
            await this.incrementLoginAttempts(user);
            throw new UnauthorizedException('Invalid credentials');
        }

        // Check user status
        if (!user.isActive) {
            throw new UnauthorizedException('Account is not active');
        }

        // Reset login attempts and update last login
        await this.resetLoginAttempts(user);
        await this.updateLastLogin(user);

        // Generate tokens
        const tokens = await this.generateTokens(user, rememberMe);

        return {
            user: user.toSafeObject(),
            tokens,
            session: {
                expiresIn: rememberMe ? 86400 * 7 : 86400, // 7 days or 24 hours
                issuedAt: Date.now(),
                rememberMe
            }
        };
    }

    async validateUser(payload: JwtPayload): Promise<User> {
        const user = await this.userModel.findById(payload.sub);

        if (!user || !user.isActive) {
            throw new UnauthorizedException('Invalid token');
        }

        return user;
    }

    async refreshToken(refreshToken: string): Promise<AuthResponse> {
        try {
            const payload = this.jwtService.verify(refreshToken);
            const user = await this.validateUser(payload);

            const tokens = await this.generateTokens(user, true);

            return {
                user: user.toSafeObject(),
                tokens,
                session: {
                    expiresIn: 86400 * 30, // 30 days
                    issuedAt: Date.now(),
                    rememberMe: true
                }
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async changePassword(userId: number, changePasswordDto: ChangePasswordDto): Promise<void> {
        const { currentPassword, newPassword, confirmPassword } = changePasswordDto;

        if (newPassword !== confirmPassword) {
            throw new BadRequestException('New passwords do not match');
        }

        const user = await this.userModel.findById(userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Validate current password
        const isCurrentPasswordValid = await user.validatePassword(currentPassword);
        if (!isCurrentPasswordValid) {
            throw new UnauthorizedException('Current password is incorrect');
        }

        // Update password
        user.password = newPassword; // Will be hashed by the entity
        await user.save();
    }

    async logout(userId: number): Promise<void> {
        // In a real application, you might want to blacklist the token
        // For now, we'll just update the user's last activity
        await this.userModel.updateOne({ _id: userId }, {
            lastLoginAt: new Date()
        });
    }

    async getProfile(userId: number): Promise<User> {
        const user = await this.userModel.findById(userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    private async generateTokens(user: User, rememberMe: boolean): Promise<{ access_token: string; refresh_token?: string }> {
        const payload: JwtPayload = {
            sub: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        const access_token = this.jwtService.sign(payload, {
            expiresIn: rememberMe ? '7d' : '24h' // Development: 24 hours default, 7 days for remember me
        });

        let refresh_token: string | undefined;
        if (rememberMe) {
            refresh_token = this.jwtService.sign(payload, {
                expiresIn: '30d'
            });
        }

        return {
            access_token,
            refresh_token
        };
    }

    private async incrementLoginAttempts(user: User): Promise<void> {
        const attempts = user.loginAttempts + 1;
        const updates: Partial<User> = { loginAttempts: attempts };

        // Lock account after 5 failed attempts for 15 minutes
        if (attempts >= 5) {
            updates.lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
        }

        await this.userModel.updateOne({ _id: user.id }, updates);
    }

    private async resetLoginAttempts(user: User): Promise<void> {
        if (user.loginAttempts > 0 || user.lockedUntil) {
            await this.userModel.updateOne({ _id: user.id }, {
                loginAttempts: 0,
                lockedUntil: undefined
            });
        }
    }

    private async updateLastLogin(user: User): Promise<void> {
        await this.userModel.updateOne({ _id: user.id }, {
            lastLoginAt: new Date()
        });
    }

    private generateToken(): string {
        return crypto.randomBytes(32).toString('hex');
    }

    async getUserStats(): Promise<{
        total: number;
        active: number;
        pending: number;
        suspended: number;
        recentRegistrations: number;
    }> {
        const total = await this.userModel.countDocuments();
        const active = await this.userModel.countDocuments({ status: UserStatus.ACTIVE });
        const pending = await this.userModel.countDocuments({ status: UserStatus.PENDING });
        const suspended = await this.userModel.countDocuments({ status: UserStatus.SUSPENDED });

        // Recent registrations (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentRegistrations = await this.userModel.countDocuments({
            createdAt: { $gte: sevenDaysAgo }
        });

        return {
            total,
            active,
            pending,
            suspended,
            recentRegistrations
        };
    }
} 