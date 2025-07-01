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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactMessage = exports.MessageStatus = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
var MessageStatus;
(function (MessageStatus) {
    MessageStatus["UNREAD"] = "unread";
    MessageStatus["READ"] = "read";
    MessageStatus["REPLIED"] = "replied";
    MessageStatus["ARCHIVED"] = "archived";
})(MessageStatus || (exports.MessageStatus = MessageStatus = {}));
let ContactMessage = class ContactMessage {
    id;
    name;
    email;
    subject;
    message;
    status;
    createdAt;
    readAt;
};
exports.ContactMessage = ContactMessage;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ContactMessage.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sender name', maxLength: 100 }),
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], ContactMessage.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sender email address' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContactMessage.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Message subject', maxLength: 200 }),
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], ContactMessage.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Message content' }),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], ContactMessage.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Message status',
        enum: MessageStatus,
        default: MessageStatus.UNREAD
    }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: MessageStatus,
        default: MessageStatus.UNREAD,
    }),
    __metadata("design:type", String)
], ContactMessage.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Message creation timestamp' }),
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ContactMessage.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Message read timestamp', required: false }),
    (0, typeorm_1.Column)({ nullable: true, name: 'read_at' }),
    __metadata("design:type", Date)
], ContactMessage.prototype, "readAt", void 0);
exports.ContactMessage = ContactMessage = __decorate([
    (0, typeorm_1.Entity)('contact_messages'),
    (0, typeorm_1.Index)(['status', 'createdAt']),
    (0, typeorm_1.Index)(['email'])
], ContactMessage);
//# sourceMappingURL=contact-message.entity.js.map