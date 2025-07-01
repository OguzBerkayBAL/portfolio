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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../../entities/user.entity");
const crypto = require("crypto");
let AuthService = class AuthService {
    userRepository;
    jwtService;
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const { username, email, password, confirmPassword, firstName, lastName } = registerDto;
        if (password !== confirmPassword) {
            throw new common_1.BadRequestException('Passwords do not match');
        }
        const existingUser = await this.userRepository.findOne({
            where: [
                { username },
                { email }
            ]
        });
        if (existingUser) {
            if (existingUser.username === username) {
                throw new common_1.ConflictException('Username already exists');
            }
            if (existingUser.email === email) {
                throw new common_1.ConflictException('Email already exists');
            }
        }
        const user = this.userRepository.create({
            username,
            email,
            password,
            firstName,
            lastName,
            emailVerificationToken: this.generateToken(),
            status: user_entity_1.UserStatus.PENDING
        });
        const savedUser = await this.userRepository.save(user);
        const tokens = await this.generateTokens(savedUser, false);
        return {
            user: savedUser.toSafeObject(),
            tokens,
            session: {
                expiresIn: 86400,
                issuedAt: Date.now(),
                rememberMe: false
            }
        };
    }
    async login(loginDto) {
        const { usernameOrEmail, password, rememberMe = false } = loginDto;
        const user = await this.userRepository.findOne({
            where: [
                { username: usernameOrEmail },
                { email: usernameOrEmail }
            ]
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (user.isLocked) {
            throw new common_1.UnauthorizedException('Account is temporarily locked due to multiple failed attempts');
        }
        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            await this.incrementLoginAttempts(user);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!user.isActive) {
            throw new common_1.UnauthorizedException('Account is not active');
        }
        await this.resetLoginAttempts(user);
        await this.updateLastLogin(user);
        const tokens = await this.generateTokens(user, rememberMe);
        return {
            user: user.toSafeObject(),
            tokens,
            session: {
                expiresIn: rememberMe ? 86400 * 7 : 86400,
                issuedAt: Date.now(),
                rememberMe
            }
        };
    }
    async validateUser(payload) {
        const user = await this.userRepository.findOne({
            where: { id: payload.sub }
        });
        if (!user || !user.isActive) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        return user;
    }
    async refreshToken(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken);
            const user = await this.validateUser(payload);
            const tokens = await this.generateTokens(user, true);
            return {
                user: user.toSafeObject(),
                tokens,
                session: {
                    expiresIn: 86400 * 30,
                    issuedAt: Date.now(),
                    rememberMe: true
                }
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async changePassword(userId, changePasswordDto) {
        const { currentPassword, newPassword, confirmPassword } = changePasswordDto;
        if (newPassword !== confirmPassword) {
            throw new common_1.BadRequestException('New passwords do not match');
        }
        const user = await this.userRepository.findOne({
            where: { id: userId }
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isCurrentPasswordValid = await user.validatePassword(currentPassword);
        if (!isCurrentPasswordValid) {
            throw new common_1.UnauthorizedException('Current password is incorrect');
        }
        user.password = newPassword;
        await this.userRepository.save(user);
    }
    async logout(userId) {
        await this.userRepository.update(userId, {
            lastLoginAt: new Date()
        });
    }
    async getProfile(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId }
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async generateTokens(user, rememberMe) {
        const payload = {
            sub: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        };
        const access_token = this.jwtService.sign(payload, {
            expiresIn: rememberMe ? '7d' : '24h'
        });
        let refresh_token;
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
    async incrementLoginAttempts(user) {
        const attempts = user.loginAttempts + 1;
        const updates = { loginAttempts: attempts };
        if (attempts >= 5) {
            updates.lockedUntil = new Date(Date.now() + 15 * 60 * 1000);
        }
        await this.userRepository.update(user.id, updates);
    }
    async resetLoginAttempts(user) {
        if (user.loginAttempts > 0 || user.lockedUntil) {
            await this.userRepository.update(user.id, {
                loginAttempts: 0,
                lockedUntil: undefined
            });
        }
    }
    async updateLastLogin(user) {
        await this.userRepository.update(user.id, {
            lastLoginAt: new Date()
        });
    }
    generateToken() {
        return crypto.randomBytes(32).toString('hex');
    }
    async getUserStats() {
        const total = await this.userRepository.count();
        const active = await this.userRepository.count({ where: { status: user_entity_1.UserStatus.ACTIVE } });
        const pending = await this.userRepository.count({ where: { status: user_entity_1.UserStatus.PENDING } });
        const suspended = await this.userRepository.count({ where: { status: user_entity_1.UserStatus.SUSPENDED } });
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentRegistrations = await this.userRepository
            .createQueryBuilder('user')
            .where('user.createdAt >= :date', { date: sevenDaysAgo })
            .getCount();
        return {
            total,
            active,
            pending,
            suspended,
            recentRegistrations
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map