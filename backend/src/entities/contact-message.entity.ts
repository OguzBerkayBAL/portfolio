import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export enum MessageStatus {
    UNREAD = 'unread',
    READ = 'read',
    REPLIED = 'replied',
    ARCHIVED = 'archived'
}

@Schema({
    timestamps: { createdAt: 'created_at' },
    collection: 'contact_messages'
})
export class ContactMessage extends Document {
    @ApiProperty({ description: 'Unique identifier' })
    declare _id: string;

    @ApiProperty({ description: 'Sender name', maxLength: 100 })
    @Prop({ required: true, maxlength: 100 })
    name: string;

    @ApiProperty({ description: 'Sender email address' })
    @Prop({ required: true })
    email: string;

    @ApiProperty({ description: 'Message subject', maxLength: 200 })
    @Prop({ required: true, maxlength: 200 })
    subject: string;

    @ApiProperty({ description: 'Message content' })
    @Prop({ required: true })
    message: string;

    @ApiProperty({
        description: 'Message status',
        enum: MessageStatus,
        default: MessageStatus.UNREAD
    })
    @Prop({
        type: String,
        enum: MessageStatus,
        default: MessageStatus.UNREAD,
    })
    status: MessageStatus;

    @ApiProperty({ description: 'Message creation timestamp' })
    created_at: Date;

    @ApiProperty({ description: 'Message read timestamp', required: false })
    @Prop()
    readAt?: Date;
}

export const ContactMessageSchema = SchemaFactory.createForClass(ContactMessage);

// Indexes
ContactMessageSchema.index({ status: 1, created_at: -1 });
ContactMessageSchema.index({ email: 1 }); 