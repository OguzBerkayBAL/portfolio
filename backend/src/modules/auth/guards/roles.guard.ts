import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../../entities/user.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        if (!user) {
            throw new ForbiddenException({
                success: false,
                error: 'ACCESS_DENIED',
                message: '🛡️ User not authenticated',
                timestamp: new Date().toISOString(),
                system: {
                    status: 'SECURITY_VIOLATION',
                    code: 'ROLE_001'
                }
            });
        }

        const hasRole = requiredRoles.some((role) => user.role === role);

        if (!hasRole) {
            throw new ForbiddenException({
                success: false,
                error: 'INSUFFICIENT_PRIVILEGES',
                message: `🚫 Access denied - Required roles: [${requiredRoles.join(', ')}]`,
                timestamp: new Date().toISOString(),
                system: {
                    status: 'AUTHORIZATION_FAILED',
                    code: 'ROLE_002',
                    userRole: user.role,
                    requiredRoles
                }
            });
        }

        return true;
    }
} 