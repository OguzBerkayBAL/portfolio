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
exports.CreateExperienceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateExperienceDto {
    title;
    company;
    location;
    startDate;
    endDate;
    current;
    description;
    technologies;
    achievements;
}
exports.CreateExperienceDto = CreateExperienceDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Job title/position',
        example: 'Senior Full Stack Developer',
        maxLength: 100
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExperienceDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Company name',
        example: 'TechCorp Solutions',
        maxLength: 100
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExperienceDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Work location',
        example: 'Istanbul, Turkey',
        required: false,
        maxLength: 100
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExperienceDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Employment start date',
        example: '2022-01-15',
        type: 'string',
        format: 'date'
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateExperienceDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Employment end date (null if current)',
        example: '2023-12-31',
        required: false,
        type: 'string',
        format: 'date'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateExperienceDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether this is current position',
        example: false,
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateExperienceDto.prototype, "current", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Job description and responsibilities',
        example: 'Leading development of enterprise web applications and mentoring junior developers...'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExperienceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Technologies used in this role',
        example: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Docker', 'AWS'],
        type: [String],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateExperienceDto.prototype, "technologies", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Key achievements and accomplishments',
        example: [
            'Increased application performance by 40%',
            'Led team of 5 developers',
            'Implemented CI/CD pipeline'
        ],
        type: [String],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateExperienceDto.prototype, "achievements", void 0);
//# sourceMappingURL=create-experience.dto.js.map