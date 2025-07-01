import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
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

@Schema({
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'users'
})
export class User extends Document {
    @Prop({ required: true, unique: true, maxlength: 100 })
    username: string;

    @Prop({ required: true, unique: true, maxlength: 255 })
    email: string;

    @Prop({ required: true, maxlength: 255 })
    @Exclude({ toPlainOnly: true })
    password: string;

    @Prop({ maxlength: 100 })
    firstName?: string;

    @Prop({ maxlength: 100 })
    lastName?: string;

    @Prop({ maxlength: 255 })
    avatar?: string;

    @Prop({
        type: String,
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;

    @Prop({
        type: String,
        enum: UserStatus,
        default: UserStatus.ACTIVE
    })
    status: UserStatus;

    @Prop({ maxlength: 255 })
    resetPasswordToken?: string;

    @Prop()
    resetPasswordExpires?: Date;

    @Prop({ maxlength: 255 })
    emailVerificationToken?: string;

    @Prop({ default: false })
    emailVerified: boolean;

    @Prop()
    lastLoginAt?: Date;

    @Prop({ maxlength: 45 })
    lastLoginIp?: string;

    @Prop({ default: 0 })
    loginAttempts: number;

    @Prop()
    lockedUntil?: Date;

    @Prop({ type: Object })
    preferences?: Record<string, any>;

    created_at: Date;
    updated_at: Date;

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
        const { password, resetPasswordToken, emailVerificationToken, ...safe } = this.toObject();
        return safe;
    }
}

export const UserSchema = SchemaFactory.createForClass(User);

// Pre-save middleware for password hashing
UserSchema.pre<User>('save', async function (next) {
    if (!this.isModified('password')) return next();

    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
}); 