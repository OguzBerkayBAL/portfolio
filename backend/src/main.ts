// Polyfill for crypto if not available
const crypto = require('crypto');
if (!global.crypto) {
  (global as any).crypto = {
    randomUUID: crypto.randomUUID || (() => crypto.randomBytes(16).toString('hex')),
    getRandomValues: (arr: any) => crypto.randomFillSync(arr),
    subtle: {}
  };
}

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // API prefix
  const apiPrefix = configService.get('apiPrefix', 'api/v1');
  app.setGlobalPrefix(apiPrefix);

  // CORS configuration
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://portfolio-frontend-imdw.onrender.com',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('🚀 Dark Tech Portfolio API')
    .setDescription(
      '⚡ Modern portfolio backend with terminal aesthetics\n\n' +
      '**Dark Theme Tech Portfolio** - A cyberpunk-inspired API for portfolio management\n\n' +
      '🎯 Features:\n' +
      '• Project showcase with filtering\n' +
      '• Skills management with categories\n' +
      '• Experience timeline\n' +
      '• Blog system with markdown support\n' +
      '• Contact message handling\n\n' +
      '🔐 Authentication required for admin endpoints'
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('🏠 Health', 'Health check endpoints')
    .addTag('📁 Projects', 'Project management endpoints')
    .addTag('⚡ Skills', 'Skills and technologies endpoints')
    .addTag('💼 Experience', 'Work experience endpoints')
    .addTag('📝 Blog', 'Blog post management endpoints')
    .addTag('📬 Contact', 'Contact message endpoints')
    .addTag('🔐 Auth', 'Authentication endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Dark Tech Portfolio API',
    customfavIcon: '🚀',
    customCss: `
      .swagger-ui .topbar { 
        background-color: #0a0a0a; 
        border-bottom: 2px solid #00ffff; 
      }
      .swagger-ui .topbar .link { 
        color: #00ffff; 
        font-family: 'JetBrains Mono', monospace; 
      }
      body { 
        background-color: #1a1a1a; 
        color: #ffffff; 
      }
      .swagger-ui .scheme-container { 
        background: #2a2a2a; 
        border: 1px solid #00ffff; 
      }
    `,
  });

  // Start server
  const port = configService.get('port', 3002);
  await app.listen(port);

  console.log(`
  🚀 ═══════════════════════════════════════════
     DARK TECH PORTFOLIO API STARTED
  ═══════════════════════════════════════════ ⚡
  
  📡 Server:     http://localhost:${port}
  📋 API:        http://localhost:${port}/${apiPrefix}
  📖 Docs:       http://localhost:${port}/docs
  🎯 Environment: ${configService.get('nodeEnv')}
  
  ┌─ TERMINAL READY ──────────────────────── ● ● ● ┐
  │ berkay@portfolio-api:~$ API_STATUS=ONLINE      │
  │ > All systems operational                      │  
  │ > Cyberpunk mode: ENABLED                      │
  │ > Matrix protocols: ACTIVE                     │
  └───────────────────────────────────────────────┘
  `);
}

bootstrap();