import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ContactMessage, MessageStatus } from '../../entities/contact-message.entity';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';
import { QueryContactMessageDto } from './dto/query-contact-message.dto';

@Injectable()
export class ContactService {
    constructor(
        @InjectRepository(ContactMessage)
        private readonly contactMessageRepository: Repository<ContactMessage>,
    ) { }

    async create(createContactMessageDto: CreateContactMessageDto): Promise<ContactMessage> {
        const contactMessage = this.contactMessageRepository.create({
            ...createContactMessageDto,
            status: MessageStatus.UNREAD, // Default status
        });

        return await this.contactMessageRepository.save(contactMessage);
    }

    async findAll(queryDto: QueryContactMessageDto) {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'DESC' } = queryDto;
        const skip = (page - 1) * limit;

        const queryBuilder = this.contactMessageRepository
            .createQueryBuilder('contactMessage')
            .skip(skip)
            .take(limit)
            .orderBy(`contactMessage.${sortBy}`, sortOrder);

        // Apply filters
        this.applyFilters(queryBuilder, queryDto);

        const [data, total] = await queryBuilder.getManyAndCount();

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findOne(id: string): Promise<ContactMessage> {
        const contactMessage = await this.contactMessageRepository.findOne({
            where: { id },
        });

        if (!contactMessage) {
            throw new NotFoundException(`Contact message with ID "${id}" not found in communication logs`);
        }

        return contactMessage;
    }

    async findUnread(): Promise<ContactMessage[]> {
        return await this.contactMessageRepository.find({
            where: { status: MessageStatus.UNREAD },
            order: { createdAt: 'DESC' },
        });
    }

    async markAsRead(id: string): Promise<ContactMessage> {
        const contactMessage = await this.findOne(id);

        contactMessage.status = MessageStatus.READ;
        contactMessage.readAt = new Date();

        return await this.contactMessageRepository.save(contactMessage);
    }

    async update(id: string, updateContactMessageDto: UpdateContactMessageDto): Promise<ContactMessage> {
        const contactMessage = await this.findOne(id);

        Object.assign(contactMessage, updateContactMessageDto);
        return await this.contactMessageRepository.save(contactMessage);
    }

    async remove(id: string): Promise<void> {
        const contactMessage = await this.findOne(id);
        await this.contactMessageRepository.remove(contactMessage);
    }

    async getContactStats() {
        const [total, unread, read, replied, archived] = await Promise.all([
            this.contactMessageRepository.count(),
            this.contactMessageRepository.count({ where: { status: MessageStatus.UNREAD } }),
            this.contactMessageRepository.count({ where: { status: MessageStatus.READ } }),
            this.contactMessageRepository.count({ where: { status: MessageStatus.REPLIED } }),
            this.contactMessageRepository.count({ where: { status: MessageStatus.ARCHIVED } }),
        ]);

        const responseRate = total > 0 ? Math.round((replied / total) * 100) : 0;

        return {
            total,
            unread,
            read,
            replied,
            archived,
            responseRate,
        };
    }

    async getRecentMessages(limit: number = 5): Promise<ContactMessage[]> {
        return await this.contactMessageRepository.find({
            order: { createdAt: 'DESC' },
            take: limit,
            select: ['id', 'name', 'email', 'subject', 'status', 'createdAt'],
        });
    }

    private applyFilters(
        queryBuilder: SelectQueryBuilder<ContactMessage>,
        filters: Partial<QueryContactMessageDto>,
    ) {
        const { search, status, email, createdAfter, createdBefore } = filters;

        if (search) {
            queryBuilder.andWhere(
                '(contactMessage.name ILIKE :search OR contactMessage.email ILIKE :search OR contactMessage.subject ILIKE :search OR contactMessage.message ILIKE :search)',
                { search: `%${search}%` },
            );
        }

        if (status) {
            queryBuilder.andWhere('contactMessage.status = :status', { status });
        }

        if (email) {
            queryBuilder.andWhere('contactMessage.email ILIKE :email', { email: `%${email}%` });
        }

        if (createdAfter) {
            queryBuilder.andWhere('contactMessage.createdAt >= :createdAfter', {
                createdAfter: new Date(createdAfter)
            });
        }

        if (createdBefore) {
            queryBuilder.andWhere('contactMessage.createdAt <= :createdBefore', {
                createdBefore: new Date(createdBefore)
            });
        }
    }
} 