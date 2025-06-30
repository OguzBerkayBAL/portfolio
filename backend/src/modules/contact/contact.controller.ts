import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseUUIDPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';
import { QueryContactMessageDto } from './dto/query-contact-message.dto';

@ApiTags('📡 Contact/Communication')
@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Initialize Communication Channel',
        description: 'Create a new contact message in the neural communication matrix'
    })
    @ApiResponse({
        status: 201,
        description: 'Communication channel established successfully',
    })
    async create(@Body() createContactMessageDto: CreateContactMessageDto) {
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

    @Get()
    @ApiOperation({
        summary: 'Scan Communication Matrix',
        description: 'Retrieve all contact messages with advanced filtering'
    })
    @ApiResponse({
        status: 200,
        description: 'Communication matrix scan complete',
    })
    async findAll(@Query() queryDto: QueryContactMessageDto) {
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

    @Get('unread')
    @ApiOperation({
        summary: 'Scan Unread Transmissions',
        description: 'Retrieve all unread contact messages'
    })
    @ApiResponse({
        status: 200,
        description: 'Unread transmissions retrieved',
    })
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

    @Get('stats')
    @ApiOperation({
        summary: 'Communication Analytics',
        description: 'Get comprehensive statistics about contact messages'
    })
    @ApiResponse({
        status: 200,
        description: 'Communication analytics retrieved',
    })
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

    @Get('recent')
    @ApiOperation({
        summary: 'Recent Communications',
        description: 'Get recent contact messages overview'
    })
    @ApiResponse({
        status: 200,
        description: 'Recent communications retrieved',
    })
    async getRecent(@Query('limit') limit?: number) {
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

    @Get(':id')
    @ApiOperation({
        summary: 'Access Communication Node',
        description: 'Retrieve specific contact message by ID'
    })
    @ApiParam({ name: 'id', description: 'Communication node ID' })
    @ApiResponse({
        status: 200,
        description: 'Communication node accessed successfully',
    })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
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

    @Patch(':id/read')
    @ApiOperation({
        summary: 'Mark Transmission as Read',
        description: 'Update message status to read and set read timestamp'
    })
    @ApiParam({ name: 'id', description: 'Communication node ID' })
    @ApiResponse({
        status: 200,
        description: 'Transmission marked as read',
    })
    async markAsRead(@Param('id', ParseUUIDPipe) id: string) {
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

    @Patch(':id')
    @ApiOperation({
        summary: 'Update Communication Node',
        description: 'Modify contact message properties'
    })
    @ApiParam({ name: 'id', description: 'Communication node ID' })
    @ApiResponse({
        status: 200,
        description: 'Communication node updated successfully',
    })
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateContactMessageDto: UpdateContactMessageDto,
    ) {
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

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Purge Communication Node',
        description: 'Permanently delete contact message from the matrix'
    })
    @ApiParam({ name: 'id', description: 'Communication node ID' })
    @ApiResponse({
        status: 204,
        description: 'Communication node purged successfully',
    })
    async remove(@Param('id', ParseUUIDPipe) id: string) {
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
} 