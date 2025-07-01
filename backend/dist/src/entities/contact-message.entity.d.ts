export declare enum MessageStatus {
    UNREAD = "unread",
    READ = "read",
    REPLIED = "replied",
    ARCHIVED = "archived"
}
export declare class ContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: MessageStatus;
    createdAt: Date;
    readAt?: Date;
}
