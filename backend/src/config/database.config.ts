import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const databaseConfig = async (
    configService: ConfigService,
): Promise<MongooseModuleOptions> => {
    const isProduction = configService.get('NODE_ENV') === 'production';

    if (isProduction) {
        // Production: MongoDB Atlas
        const mongoUri = configService.get<string>('MONGODB_URI');
        if (!mongoUri) {
            throw new Error('MONGODB_URI is required in production');
        }

        return {
            uri: mongoUri,
            retryWrites: true,
            w: 'majority',
        };
    } else {
        // Development: Local MongoDB
        const host = configService.get<string>('DB_HOST', 'localhost');
        const port = configService.get<number>('DB_PORT', 27017);
        const database = configService.get<string>('DB_NAME', 'portfolio_dev');

        return {
            uri: `mongodb://${host}:${port}/${database}`,
        };
    }
}; 