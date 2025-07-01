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
declare const _default: () => AppConfig;
export default _default;
