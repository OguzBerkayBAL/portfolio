import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
    MODERATOR = 'moderator'
}

export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    SUSPENDED = 'suspended',
    PENDING = 'pending'
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    @Exclude({ toPlainOnly: true })
    password: string;

    @Column({ type: 'varchar', length: 100, nullable: true, name: 'first_name' })
    firstName?: string;

    @Column({ type: 'varchar', length: 100, nullable: true, name: 'last_name' })
    lastName?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    avatar?: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;

    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.ACTIVE
    })
    status: UserStatus;

    @Column({ type: 'varchar', length: 255, nullable: true, name: 'reset_password_token' })
    resetPasswordToken?: string;

    @Column({ type: 'timestamp', nullable: true, name: 'reset_password_expires' })
    resetPasswordExpires?: Date;

    @Column({ type: 'varchar', length: 255, nullable: true, name: 'email_verification_token' })
    emailVerificationToken?: string;

    @Column({ type: 'boolean', default: false, name: 'email_verified' })
    emailVerified: boolean;

    @Column({ type: 'timestamp', nullable: true, name: 'last_login_at' })
    lastLoginAt?: Date;

    @Column({ type: 'varchar', length: 45, nullable: true, name: 'last_login_ip' })
    lastLoginIp?: string;

    @Column({ type: 'int', default: 0, name: 'login_attempts' })
    loginAttempts: number;

    @Column({ type: 'timestamp', nullable: true, name: 'locked_until' })
    lockedUntil?: Date;

    @Column({ type: 'jsonb', nullable: true })
    preferences?: Record<string, any>;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            const saltRounds = 12;
            this.password = await bcrypt.hash(this.password, saltRounds);
        }
    }

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }

    get fullName(): string {
        if (this.firstName && this.lastName) {
            return `${this.firstName} ${this.lastName}`;
        }
        return this.firstName || this.lastName || this.username;
    }

    get isLocked(): boolean {
        return !!(this.lockedUntil && this.lockedUntil > new Date());
    }

    get isActive(): boolean {
        return this.status === UserStatus.ACTIVE && !this.isLocked;
    }

    toSafeObject() {
        const { password, resetPasswordToken, emailVerificationToken, ...safe } = this;
        return safe;
    }
} 