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
exports.Experience = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let Experience = class Experience {
    id;
    title;
    company;
    location;
    startDate;
    endDate;
    current;
    description;
    technologies;
    achievements;
};
exports.Experience = Experience;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Experience.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Job title', maxLength: 100 }),
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Experience.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Company name', maxLength: 100 }),
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Experience.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Work location', required: false }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Experience.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Employment start date' }),
    (0, typeorm_1.Column)('date', { name: 'start_date' }),
    __metadata("design:type", Date)
], Experience.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Employment end date', required: false }),
    (0, typeorm_1.Column)('date', { nullable: true, name: 'end_date' }),
    __metadata("design:type", Date)
], Experience.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether this is current employment' }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Experience.prototype, "current", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Job description' }),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Experience.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Technologies used', type: [String] }),
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], Experience.prototype, "technologies", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Key achievements', type: [String] }),
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], Experience.prototype, "achievements", void 0);
exports.Experience = Experience = __decorate([
    (0, typeorm_1.Entity)('experiences'),
    (0, typeorm_1.Index)(['current', 'startDate'])
], Experience);
//# sourceMappingURL=experience.entity.js.map