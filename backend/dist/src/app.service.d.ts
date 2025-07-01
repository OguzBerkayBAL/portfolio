import { ConfigService } from '@nestjs/config';
export declare class AppService {
    private readonly configService;
    constructor(configService: ConfigService);
    getHealthCheck(): {
        status: string;
        message: string;
        timestamp: string;
        uptime: number;
        environment: any;
        version: string;
        terminal: {
            prompt: string;
            status: string;
            matrix_mode: boolean;
        };
    };
    getTerminalStatus(): {
        ascii_banner: string;
        system_info: {
            hostname: string;
            platform: NodeJS.Platform;
            arch: NodeJS.Architecture;
            nodeVersion: string;
            memoryUsage: NodeJS.MemoryUsage;
            cpuUsage: NodeJS.CpuUsage;
            pid: number;
            cwd: string;
        };
        commands: string[];
        matrix_rain: {
            enabled: boolean;
            density: number;
            speed: string;
            characters: string[];
        };
        terminal_prompt: string;
    };
}
