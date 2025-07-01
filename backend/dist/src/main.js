"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require('crypto');
if (!global.crypto) {
    global.crypto = {
        randomUUID: crypto.randomUUID || (() => crypto.randomBytes(16).toString('hex')),
        getRandomValues: (arr) => crypto.randomFillSync(arr),
        subtle: {}
    };
}
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const apiPrefix = configService.get('apiPrefix', 'api/v1');
    app.setGlobalPrefix(apiPrefix);
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:3001',
            process.env.FRONTEND_URL,
            /\.onrender\.com$/
        ].filter(Boolean),
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('🚀 Dark Tech Portfolio API')
        .setDescription('⚡ Modern portfolio backend with terminal aesthetics\n\n' +
        '**Dark Theme Tech Portfolio** - A cyberpunk-inspired API for portfolio management\n\n' +
        '🎯 Features:\n' +
        '• Project showcase with filtering\n' +
        '• Skills management with categories\n' +
        '• Experience timeline\n' +
        '• Blog system with markdown support\n' +
        '• Contact message handling\n\n' +
        '🔐 Authentication required for admin endpoints')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
        .addTag('🏠 Health', 'Health check endpoints')
        .addTag('📁 Projects', 'Project management endpoints')
        .addTag('⚡ Skills', 'Skills and technologies endpoints')
        .addTag('💼 Experience', 'Work experience endpoints')
        .addTag('📝 Blog', 'Blog post management endpoints')
        .addTag('📬 Contact', 'Contact message endpoints')
        .addTag('🔐 Auth', 'Authentication endpoints')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document, {
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
    const port = configService.get('port', 3001);
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
//# sourceMappingURL=main.js.map