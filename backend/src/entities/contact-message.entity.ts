import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum MessageStatus {
    UNREAD = 'unread',
    READ = 'read',
    REPLIED = 'replied',
    ARCHIVED = 'archived'
}

@Entity('contact_messages')
@Index(['status', 'createdAt'])
@Index(['email'])
export class ContactMessage {
    @ApiProperty({ description: 'Unique identifier' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Sender name', maxLength: 100 })
    @Column({ length: 100 })
    name: string;

    @ApiProperty({ description: 'Sender email address' })
    @Column()
    email: string;

    @ApiProperty({ description: 'Message subject', maxLength: 200 })
    @Column({ length: 200 })
    subject: string;

    @ApiProperty({ description: 'Message content' })
    @Column('text')
    message: string;

    @ApiProperty({
        description: 'Message status',
        enum: MessageStatus,
        default: MessageStatus.UNREAD
    })
    @Column({
        type: 'enum',
        enum: MessageStatus,
        default: MessageStatus.UNREAD,
    })
    status: MessageStatus;

    @ApiProperty({ description: 'Message creation timestamp' })
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ApiProperty({ description: 'Message read timestamp', required: false })
    @Column({ nullable: true, name: 'read_at' })
    readAt?: Date;
} 