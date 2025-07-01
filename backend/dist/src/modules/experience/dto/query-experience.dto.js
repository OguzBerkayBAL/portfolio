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
exports.QueryExperienceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class QueryExperienceDto {
    company;
    technology;
    current;
    search;
    startDateAfter;
    startDateBefore;
    page = 1;
    limit = 10;
    sortBy = 'startDate';
    sortOrder = 'DESC';
}
exports.QueryExperienceDto = QueryExperienceDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by company name',
        example: 'TechCorp'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryExperienceDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by technology used',
        example: 'React'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryExperienceDto.prototype, "technology", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by current position',
        example: true
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], QueryExperienceDto.prototype, "current", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Search in title, company, or description',
        example: 'developer'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryExperienceDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter experiences after this date',
        example: '2020-01-01',
        type: 'string',
        format: 'date'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], QueryExperienceDto.prototype, "startDateAfter", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter experiences before this date',
        example: '2023-12-31',
        type: 'string',
        format: 'date'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], QueryExperienceDto.prototype, "startDateBefore", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Page number for pagination',
        minimum: 1,
        default: 1
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], QueryExperienceDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Number of items per page',
        minimum: 1,
        maximum: 50,
        default: 10
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(50),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], QueryExperienceDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sort by field',
        enum: ['startDate', 'endDate', 'company', 'title'],
        default: 'startDate'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryExperienceDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sort order',
        enum: ['ASC', 'DESC'],
        default: 'DESC'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryExperienceDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=query-experience.dto.js.map