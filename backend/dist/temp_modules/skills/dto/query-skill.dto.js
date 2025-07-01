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
exports.QuerySkillDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const skill_entity_1 = require("../../../entities/skill.entity");
class QuerySkillDto {
    category;
    minLevel;
    search;
    page = 1;
    limit = 20;
    sortBy = 'category';
    sortOrder = 'ASC';
}
exports.QuerySkillDto = QuerySkillDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by skill category',
        enum: skill_entity_1.SkillCategory,
        example: skill_entity_1.SkillCategory.FRONTEND
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(skill_entity_1.SkillCategory),
    __metadata("design:type", typeof (_a = typeof skill_entity_1.SkillCategory !== "undefined" && skill_entity_1.SkillCategory) === "function" ? _a : Object)
], QuerySkillDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by minimum proficiency level',
        minimum: 1,
        maximum: 4,
        example: 3
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(4),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], QuerySkillDto.prototype, "minLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Search in skill names',
        example: 'React'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuerySkillDto.prototype, "search", void 0);
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
], QuerySkillDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Number of items per page',
        minimum: 1,
        maximum: 100,
        default: 20
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], QuerySkillDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sort by field',
        enum: ['category', 'level', 'name', 'order'],
        default: 'category'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuerySkillDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sort order',
        enum: ['ASC', 'DESC'],
        default: 'ASC'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuerySkillDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=query-skill.dto.js.map