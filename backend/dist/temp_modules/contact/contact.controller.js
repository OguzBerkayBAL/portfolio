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
exports.ContactController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const contact_service_1 = require("./contact.service");
const create_contact_message_dto_1 = require("./dto/create-contact-message.dto");
const update_contact_message_dto_1 = require("./dto/update-contact-message.dto");
const query_contact_message_dto_1 = require("./dto/query-contact-message.dto");
let ContactController = class ContactController {
    contactService;
    constructor(contactService) {
        this.contactService = contactService;
    }
    async create(createContactMessageDto) {
        const contactMessage = await this.contactService.create(createContactMessageDto);
        return {
            success: true,
            message: '📡 Communication channel established successfully',
            terminal: {
                command: `comm.transmit(from="${contactMessage.email}", subject="${contactMessage.subject}")`,
                output: `> Signal transmitted to neural matrix | Message ID: ${contactMessage.id.slice(-8)}`,
                status: 'TRANSMISSION_COMPLETE',
            },
            data: contactMessage,
        };
    }
    async findAll(queryDto) {
        const result = await this.contactService.findAll(queryDto);
        return {
            success: true,
            message: `📡 Matrix scan complete: ${result.total} transmissions logged`,
            data: result.data,
            total: result.total,
            page: result.page,
            limit: result.limit,
            totalPages: result.totalPages,
            terminal: {
                command: 'comm.scan(--full-spectrum --decrypt-headers)',
                output: `> ${result.total} communication nodes indexed`,
                status: 'MATRIX_SCAN_COMPLETE',
            },
        };
    }
    async findUnread() {
        const unreadMessages = await this.contactService.findUnread();
        return {
            success: true,
            message: `🔴 ${unreadMessages.length} unread transmissions detected`,
            data: unreadMessages,
            terminal: {
                command: 'comm.filter(--status=unread --priority=high)',
                output: `> ${unreadMessages.length} pending communications require attention`,
                status: 'UNREAD_SCAN_COMPLETE',
            },
        };
    }
    async getStats() {
        const stats = await this.contactService.getContactStats();
        return {
            success: true,
            message: '📊 Communication matrix analytics complete',
            data: stats,
            terminal: {
                command: 'comm.analyze(--full-spectrum --response-metrics)',
                output: `> ${stats.total} total signals | ${stats.responseRate}% response rate`,
                status: 'ANALYTICS_COMPLETE',
            },
        };
    }
    async getRecent(limit) {
        const recentMessages = await this.contactService.getRecentMessages(limit);
        return {
            success: true,
            message: `⚡ Recent communication logs accessed`,
            data: recentMessages,
            terminal: {
                command: `comm.recent(--limit=${limit || 5})`,
                output: `> ${recentMessages.length} recent transmissions in buffer`,
                status: 'RECENT_LOGS_ACCESSED',
            },
        };
    }
    async findOne(id) {
        const contactMessage = await this.contactService.findOne(id);
        return {
            success: true,
            message: '🔍 Communication node accessed',
            data: contactMessage,
            terminal: {
                command: `comm.access(node_id="${id.slice(-8)}")`,
                output: `> Signal decrypted: From ${contactMessage.name} | Subject: ${contactMessage.subject}`,
                status: 'NODE_ACCESS_GRANTED',
            },
        };
    }
    async markAsRead(id) {
        const contactMessage = await this.contactService.markAsRead(id);
        return {
            success: true,
            message: '👁️ Transmission marked as read',
            data: contactMessage,
            terminal: {
                command: `comm.mark_read(node_id="${id.slice(-8)}")`,
                output: `> Signal processed | Status: READ | Timestamp: ${contactMessage.readAt}`,
                status: 'READ_STATUS_UPDATED',
            },
        };
    }
    async update(id, updateContactMessageDto) {
        const contactMessage = await this.contactService.update(id, updateContactMessageDto);
        return {
            success: true,
            message: '🔧 Communication node updated',
            data: contactMessage,
            terminal: {
                command: `comm.update(node_id="${id.slice(-8)}", data={...})`,
                output: `> Node parameters reconfigured | Status: ${contactMessage.status}`,
                status: 'NODE_UPDATE_COMPLETE',
            },
        };
    }
    async remove(id) {
        await this.contactService.remove(id);
        return {
            success: true,
            message: '🗑️ Communication node purged from matrix',
            terminal: {
                command: `comm.purge(node_id="${id.slice(-8)}", --force)`,
                output: `> Node deleted from neural matrix | Memory released`,
                status: 'PURGE_COMPLETE',
            },
        };
    }
};
exports.ContactController = ContactController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Initialize Communication Channel',
        description: 'Create a new contact message in the neural communication matrix'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Communication channel established successfully',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_message_dto_1.CreateContactMessageDto]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Scan Communication Matrix',
        description: 'Retrieve all contact messages with advanced filtering'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Communication matrix scan complete',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_contact_message_dto_1.QueryContactMessageDto]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('unread'),
    (0, swagger_1.ApiOperation)({
        summary: 'Scan Unread Transmissions',
        description: 'Retrieve all unread contact messages'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Unread transmissions retrieved',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "findUnread", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({
        summary: 'Communication Analytics',
        description: 'Get comprehensive statistics about contact messages'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Communication analytics retrieved',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('recent'),
    (0, swagger_1.ApiOperation)({
        summary: 'Recent Communications',
        description: 'Get recent contact messages overview'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Recent communications retrieved',
    }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "getRecent", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Access Communication Node',
        description: 'Retrieve specific contact message by ID'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Communication node ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Communication node accessed successfully',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/read'),
    (0, swagger_1.ApiOperation)({
        summary: 'Mark Transmission as Read',
        description: 'Update message status to read and set read timestamp'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Communication node ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Transmission marked as read',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update Communication Node',
        description: 'Modify contact message properties'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Communication node ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Communication node updated successfully',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_contact_message_dto_1.UpdateContactMessageDto]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({
        summary: 'Purge Communication Node',
        description: 'Permanently delete contact message from the matrix'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Communication node ID' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Communication node purged successfully',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "remove", null);
exports.ContactController = ContactController = __decorate([
    (0, swagger_1.ApiTags)('📡 Contact/Communication'),
    (0, common_1.Controller)('contact'),
    __metadata("design:paramtypes", [contact_service_1.ContactService])
], ContactController);
//# sourceMappingURL=contact.controller.js.map