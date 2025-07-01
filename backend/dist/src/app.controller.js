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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    appService;
    constructor(appService) {
        this.appService = appService;
    }
    getHealthCheck() {
        return this.appService.getHealthCheck();
    }
    getTerminalStatus() {
        return this.appService.getTerminalStatus();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '🎯 API Health Check',
        description: 'Terminal-style health check endpoint for Dark Tech Portfolio API'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'API is operational',
        schema: {
            type: 'object',
            properties: {
                status: { type: 'string', example: 'online' },
                message: { type: 'string', example: 'Dark Tech Portfolio API is operational' },
                timestamp: { type: 'string', example: '2024-01-15T10:30:00.000Z' },
                uptime: { type: 'number', example: 123.456 },
                environment: { type: 'string', example: 'development' },
                version: { type: 'string', example: '1.0.0' },
                terminal: {
                    type: 'object',
                    properties: {
                        prompt: { type: 'string', example: 'berkay@portfolio-api:~$' },
                        status: { type: 'string', example: 'SYSTEMS_OPERATIONAL' },
                        matrix_mode: { type: 'boolean', example: true }
                    }
                }
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHealthCheck", null);
__decorate([
    (0, common_1.Get)('terminal'),
    (0, swagger_1.ApiOperation)({
        summary: '💻 Terminal Status',
        description: 'Get cyberpunk-style terminal status information'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Terminal status information',
        schema: {
            type: 'object',
            properties: {
                ascii_banner: { type: 'string' },
                system_info: { type: 'object' },
                commands: { type: 'array', items: { type: 'string' } }
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getTerminalStatus", null);
exports.AppController = AppController = __decorate([
    (0, swagger_1.ApiTags)('🏠 Health'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map