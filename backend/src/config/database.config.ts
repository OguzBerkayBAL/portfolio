import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => {
    const isProduction = configService.get('NODE_ENV') === 'production';

    return {
        type: 'postgres',
        host: configService.get('DATABASE_HOST', 'localhost'),
        port: configService.get('DATABASE_PORT', 5432), // Use 5432 for both prod and dev in docker
        username: configService.get('DATABASE_USERNAME', 'portfolio_user'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME', 'dark_tech_portfolio'), // Use dark_tech_portfolio database
        synchronize: true, // Tabloların otomatik oluşturulması için etkinleştirildi
        logging: !isProduction,
        autoLoadEntities: true,
        migrations: ['dist/migrations/**/*{.ts,.js}'],
        migrationsTableName: 'migrations_history',
        migrationsRun: false, // Don't auto run migrations
        ...(isProduction && {
            ssl: {
                rejectUnauthorized: false,
            },
        }),
    };
}; 