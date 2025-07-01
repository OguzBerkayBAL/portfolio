"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const contact_message_entity_1 = require("../../entities/contact-message.entity");
let ContactService = class ContactService {
    contactMessageRepository;
    constructor(contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }
    async create(createContactMessageDto) {
        const contactMessage = this.contactMessageRepository.create({
            ...createContactMessageDto,
            status: contact_message_entity_1.MessageStatus.UNREAD,
        });
        return await this.contactMessageRepository.save(contactMessage);
    }
    async findAll(queryDto) {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'DESC' } = queryDto;
        const skip = (page - 1) * limit;
        const queryBuilder = this.contactMessageRepository
            .createQueryBuilder('contactMessage')
            .skip(skip)
            .take(limit)
            .orderBy(`contactMessage.${sortBy}`, sortOrder);
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
    async findOne(id) {
        const contactMessage = await this.contactMessageRepository.findOne({
            where: { id },
        });
        if (!contactMessage) {
            throw new common_1.NotFoundException(`Contact message with ID "${id}" not found in communication logs`);
        }
        return contactMessage;
    }
    async findUnread() {
        return await this.contactMessageRepository.find({
            where: { status: contact_message_entity_1.MessageStatus.UNREAD },
            order: { createdAt: 'DESC' },
        });
    }
    async markAsRead(id) {
        const contactMessage = await this.findOne(id);
        contactMessage.status = contact_message_entity_1.MessageStatus.READ;
        contactMessage.readAt = new Date();
        return await this.contactMessageRepository.save(contactMessage);
    }
    async update(id, updateContactMessageDto) {
        const contactMessage = await this.findOne(id);
        Object.assign(contactMessage, updateContactMessageDto);
        return await this.contactMessageRepository.save(contactMessage);
    }
    async remove(id) {
        const contactMessage = await this.findOne(id);
        await this.contactMessageRepository.remove(contactMessage);
    }
    async getContactStats() {
        const [total, unread, read, replied, archived] = await Promise.all([
            this.contactMessageRepository.count(),
            this.contactMessageRepository.count({ where: { status: contact_message_entity_1.MessageStatus.UNREAD } }),
            this.contactMessageRepository.count({ where: { status: contact_message_entity_1.MessageStatus.READ } }),
            this.contactMessageRepository.count({ where: { status: contact_message_entity_1.MessageStatus.REPLIED } }),
            this.contactMessageRepository.count({ where: { status: contact_message_entity_1.MessageStatus.ARCHIVED } }),
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
    async getRecentMessages(limit = 5) {
        return await this.contactMessageRepository.find({
            order: { createdAt: 'DESC' },
            take: limit,
            select: ['id', 'name', 'email', 'subject', 'status', 'createdAt'],
        });
    }
    applyFilters(queryBuilder, filters) {
        const { search, status, email, createdAfter, createdBefore } = filters;
        if (search) {
            queryBuilder.andWhere('(contactMessage.name ILIKE :search OR contactMessage.email ILIKE :search OR contactMessage.subject ILIKE :search OR contactMessage.message ILIKE :search)', { search: `%${search}%` });
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
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contact_message_entity_1.ContactMessage)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContactService);
//# sourceMappingURL=contact.service.js.map