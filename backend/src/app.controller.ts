import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('🏠 Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOperation({
    summary: '🎯 API Health Check',
    description: 'Terminal-style health check endpoint for Dark Tech Portfolio API'
  })
  @ApiResponse({
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
  })
  getHealthCheck() {
    return this.appService.getHealthCheck();
  }

  @Get('terminal')
  @ApiOperation({
    summary: '💻 Terminal Status',
    description: 'Get cyberpunk-style terminal status information'
  })
  @ApiResponse({
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
  })
  getTerminalStatus() {
    return this.appService.getTerminalStatus();
  }
}
