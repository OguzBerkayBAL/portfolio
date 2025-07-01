"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseConfig = void 0;
const getDatabaseConfig = (configService) => {
    const isProduction = configService.get('NODE_ENV') === 'production';
    return {
        type: 'postgres',
        host: configService.get('DATABASE_HOST', 'localhost'),
        port: configService.get('DATABASE_PORT', 5432),
        username: configService.get('DATABASE_USERNAME', 'portfolio_user'),
        password: configService.get('DATABASE_PASSWORD', 'portfolio_password'),
        database: configService.get('DATABASE_NAME', 'dark_tech_portfolio'),
        synchronize: !isProduction,
        logging: !isProduction,
        autoLoadEntities: true,
        ssl: isProduction ? { rejectUnauthorized: false } : false,
    };
};
exports.getDatabaseConfig = getDatabaseConfig;
//# sourceMappingURL=database.config.js.map