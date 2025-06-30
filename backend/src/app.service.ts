import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) { }

  getHealthCheck() {
    const startTime = process.hrtime.bigint();
    const uptime = Number(startTime) / 1_000_000_000; // Convert to seconds

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
}
