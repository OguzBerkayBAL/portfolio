import { Repository } from 'typeorm';
import { ContactMessage } from '../../entities/contact-message.entity';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';
import { QueryContactMessageDto } from './dto/query-contact-message.dto';
export declare class ContactService {
    private readonly contactMessageRepository;
    constructor(contactMessageRepository: Repository<ContactMessage>);
    create(createContactMessageDto: CreateContactMessageDto): Promise<ContactMessage>;
    findAll(queryDto: QueryContactMessageDto): Promise<{
        data: ContactMessage[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<ContactMessage>;
    findUnread(): Promise<ContactMessage[]>;
    markAsRead(id: string): Promise<ContactMessage>;
    update(id: string, updateContactMessageDto: UpdateContactMessageDto): Promise<ContactMessage>;
    remove(id: string): Promise<void>;
    getContactStats(): Promise<{
        total: number;
        unread: number;
        read: number;
        replied: number;
        archived: number;
        responseRate: number;
    }>;
    getRecentMessages(limit?: number): Promise<ContactMessage[]>;
    private applyFilters;
}
