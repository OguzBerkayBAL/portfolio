import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => {
    const isProduction = configService.get('NODE_ENV') === 'production';
    const dbType = configService.get('DATABASE_TYPE', 'postgres');
    const useSQLite = configService.get('USE_SQLITE') === 'true' || process.env.USE_SQLITE === 'true';

    // Production ortamında her zaman SQLite kullan (free hosting için)
    if (isProduction || dbType === 'sqlite' || useSQLite) {
        return {
            type: 'sqlite',
            database: configService.get('DATABASE_PATH', './data/portfolio.sqlite'),
            synchronize: true, // Auto-create tables for SQLite
            logging: !isProduction,
            autoLoadEntities: true,
        };
    }

    // PostgreSQL configuration (sadece development için)
    return {
        type: 'postgres',
        host: configService.get('DATABASE_HOST', 'localhost'),
        port: configService.get('DATABASE_PORT', 5432),
        username: configService.get('DATABASE_USERNAME', 'portfolio_user'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME', 'dark_tech_portfolio'),
        synchronize: false,
        logging: !isProduction,
        autoLoadEntities: true,
    };
}; 