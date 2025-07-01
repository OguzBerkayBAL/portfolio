export declare enum UserRole {
    USER = "user",
    ADMIN = "admin",
    MODERATOR = "moderator"
}
export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended",
    PENDING = "pending"
}
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    role: UserRole;
    status: UserStatus;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    emailVerificationToken?: string;
    emailVerified: boolean;
    lastLoginAt?: Date;
    lastLoginIp?: string;
    loginAttempts: number;
    lockedUntil?: Date;
    preferences?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
    get fullName(): string;
    get isLocked(): boolean;
    get isActive(): boolean;
    toSafeObject(): Omit<this, "password" | "isActive" | "resetPasswordToken" | "emailVerificationToken" | "hashPassword" | "validatePassword" | "fullName" | "isLocked" | "toSafeObject">;
}
