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
exports.Skill = exports.SkillLevel = exports.SkillCategory = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
var SkillCategory;
(function (SkillCategory) {
    SkillCategory["FRONTEND"] = "frontend";
    SkillCategory["BACKEND"] = "backend";
    SkillCategory["DATABASE"] = "database";
    SkillCategory["DEVOPS"] = "devops";
    SkillCategory["DESIGN"] = "design";
    SkillCategory["TOOLS"] = "tools";
})(SkillCategory || (exports.SkillCategory = SkillCategory = {}));
var SkillLevel;
(function (SkillLevel) {
    SkillLevel[SkillLevel["BEGINNER"] = 1] = "BEGINNER";
    SkillLevel[SkillLevel["INTERMEDIATE"] = 2] = "INTERMEDIATE";
    SkillLevel[SkillLevel["ADVANCED"] = 3] = "ADVANCED";
    SkillLevel[SkillLevel["EXPERT"] = 4] = "EXPERT";
})(SkillLevel || (exports.SkillLevel = SkillLevel = {}));
let Skill = class Skill {
    id;
    name;
    category;
    level;
    icon;
    color;
    order;
};
exports.Skill = Skill;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Skill.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Skill name', maxLength: 50 }),
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Skill.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Skill category', enum: SkillCategory }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: SkillCategory,
    }),
    __metadata("design:type", String)
], Skill.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Skill level from 1 to 4', minimum: 1, maximum: 4 }),
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Skill.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Icon name or URL', required: false }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Skill.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Color for UI representation', required: false }),
    (0, typeorm_1.Column)({ length: 7, nullable: true }),
    __metadata("design:type", String)
], Skill.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Display order within category' }),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Skill.prototype, "order", void 0);
exports.Skill = Skill = __decorate([
    (0, typeorm_1.Entity)('skills'),
    (0, typeorm_1.Index)(['category', 'order'])
], Skill);
//# sourceMappingURL=skill.entity.js.map