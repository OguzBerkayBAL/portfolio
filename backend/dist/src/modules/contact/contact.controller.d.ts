import { ContactService } from './contact.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';
import { QueryContactMessageDto } from './dto/query-contact-message.dto';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    create(createContactMessageDto: CreateContactMessageDto): Promise<{
        success: boolean;
        message: string;
        terminal: {
            command: string;
            output: string;
            status: string;
        };
        data: import("../../entities").ContactMessage;
    }>;
    findAll(queryDto: QueryContactMessageDto): Promise<{
        success: boolean;
        message: string;
        data: import("../../entities").ContactMessage[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    findUnread(): Promise<{
        success: boolean;
        message: string;
        data: import("../../entities").ContactMessage[];
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    getStats(): Promise<{
        success: boolean;
        message: string;
        data: {
            total: number;
            unread: number;
            read: number;
            replied: number;
            archived: number;
            responseRate: number;
        };
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    getRecent(limit?: number): Promise<{
        success: boolean;
        message: string;
        data: import("../../entities").ContactMessage[];
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: import("../../entities").ContactMessage;
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    markAsRead(id: string): Promise<{
        success: boolean;
        message: string;
        data: import("../../entities").ContactMessage;
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    update(id: string, updateContactMessageDto: UpdateContactMessageDto): Promise<{
        success: boolean;
        message: string;
        data: import("../../entities").ContactMessage;
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
        terminal: {
            command: string;
            output: string;
            status: string;
        };
    }>;
}
