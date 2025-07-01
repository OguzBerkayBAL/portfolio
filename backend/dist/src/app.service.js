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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AppService = class AppService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    getHealthCheck() {
        const startTime = process.hrtime.bigint();
        const uptime = Number(startTime) / 1_000_000_000;
        return {
            status: 'online',
            message: 'Dark Tech Portfolio API is operational',
            timestamp: new Date().toISOString(),
            uptime: Number(uptime.toFixed(3)),
            environment: this.configService.get('nodeEnv', 'development'),
            version: '1.0.0',
            terminal: {
                prompt: 'berkay@portfolio-api:~$',
                status: 'SYSTEMS_OPERATIONAL',
                matrix_mode: true,
            },
        };
    }
    getTerminalStatus() {
        const asciiArt = `
    ╔═══════════════════════════════════════════════════════╗
    ║  ██████╗  █████╗ ██████╗ ██╗  ██╗    ████████╗███████╗║
    ║  ██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝    ╚══██╔══╝██╔════╝║
    ║  ██║  ██║███████║██████╔╝█████╔╝        ██║   █████╗  ║
    ║  ██║  ██║██╔══██║██╔══██╗██╔═██╗        ██║   ██╔══╝  ║
    ║  ██████╔╝██║  ██║██║  ██║██║  ██╗       ██║   ███████╗║
    ║  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝       ╚═╝   ╚══════╝║
    ║                                                       ║
    ║           🚀 PORTFOLIO API - MATRIX MODE 🚀           ║
    ╚═══════════════════════════════════════════════════════╝
    `;
        const systemInfo = {
            hostname: 'portfolio-api',
            platform: process.platform,
            arch: process.arch,
            nodeVersion: process.version,
            memoryUsage: process.memoryUsage(),
            cpuUsage: process.cpuUsage(),
            pid: process.pid,
            cwd: process.cwd(),
        };
        const availableCommands = [
            'GET / - Health check',
            'GET /terminal - This terminal status',
            'GET /api/v1/projects - List all projects',
            'GET /api/v1/skills - List all skills',
            'GET /api/v1/experiences - List work experience',
            'GET /api/v1/blog/posts - List blog posts',
            'POST /api/v1/contact - Send contact message',
            'GET /docs - API documentation',
        ];
        return {
            ascii_banner: asciiArt,
            system_info: systemInfo,
            commands: availableCommands,
            matrix_rain: {
                enabled: true,
                density: 0.8,
                speed: 'medium',
                characters: ['0', '1', 'ﾊ', 'ﾐ', 'ﾋ', 'ｰ', 'ｳ', 'ｼ', 'ﾅ', 'ﾓ', 'ﾆ', 'ｻ', 'ﾜ', 'ﾂ', 'ｵ', 'ﾘ'],
            },
            terminal_prompt: 'berkay@portfolio-api:~$ █',
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppService);
//# sourceMappingURL=app.service.js.map