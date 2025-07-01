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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryContactMessageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const contact_message_entity_1 = require("../../../entities/contact-message.entity");
class QueryContactMessageDto {
    search;
    status;
    email;
    createdAfter;
    createdBefore;
    page = 1;
    limit = 10;
    sortBy = 'createdAt';
    sortOrder = 'DESC';
}
exports.QueryContactMessageDto = QueryContactMessageDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Search in name, email, subject, or message content',
        example: 'collaboration'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryContactMessageDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by message status',
        enum: contact_message_entity_1.MessageStatus
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(contact_message_entity_1.MessageStatus),
    __metadata("design:type", typeof (_a = typeof contact_message_entity_1.MessageStatus !== "undefined" && contact_message_entity_1.MessageStatus) === "function" ? _a : Object)
], QueryContactMessageDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by sender email',
        example: 'berkay@darktech.dev'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryContactMessageDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter messages created after this date',
        example: '2025-06-01T00:00:00Z'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], QueryContactMessageDto.prototype, "createdAfter", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter messages created before this date',
        example: '2025-06-30T23:59:59Z'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], QueryContactMessageDto.prototype, "createdBefore", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Page number for pagination',
        default: 1,
        minimum: 1
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], QueryContactMessageDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Number of items per page',
        default: 10,
        minimum: 1,
        maximum: 100
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], QueryContactMessageDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sort by field',
        enum: ['createdAt', 'name', 'email', 'status'],
        default: 'createdAt'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryContactMessageDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sort order',
        enum: ['ASC', 'DESC'],
        default: 'DESC'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryContactMessageDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=query-contact-message.dto.js.map