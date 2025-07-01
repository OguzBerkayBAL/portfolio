import { MessageStatus } from '../../../entities/contact-message.entity';
export declare class QueryContactMessageDto {
    search?: string;
    status?: MessageStatus;
    email?: string;
    createdAfter?: string;
    createdBefore?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
}
