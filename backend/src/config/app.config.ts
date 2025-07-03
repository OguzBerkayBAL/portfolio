export interface AppConfig {
    port: number;
    apiPrefix: string;
    nodeEnv: string;
    corsOrigin: string;
    jwtSecret: string;
    jwtExpiresIn: string;
    uploadDest: string;
    maxFileSize: number;
    throttleTtl: number;
    throttleLimit: number;
    smtp: {
        host: string;
        port: number;
        user: string;
        pass?: string;
        from: string;
    };
}

export default (): AppConfig => ({
    port: parseInt(process.env.PORT || '3002', 10),
    apiPrefix: process.env.API_PREFIX || 'api/v1',
    nodeEnv: process.env.NODE_ENV || 'development',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    jwtSecret: process.env.JWT_SECRET || (() => { throw new Error('JWT_SECRET is required') })(),
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    uploadDest: process.env.UPLOAD_DEST || './uploads',
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10), // 5MB
    throttleTtl: parseInt(process.env.THROTTLE_TTL || '60', 10),
    throttleLimit: parseInt(process.env.THROTTLE_LIMIT || '100', 10),
    smtp: {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        user: process.env.SMTP_USER || 'your-email@gmail.com',
        pass: process.env.SMTP_PASS,
        from: process.env.SMTP_FROM || 'your-email@gmail.com',
    },
}); 