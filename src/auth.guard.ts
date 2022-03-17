import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly logger: PinoLogger
    ) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        if (request.path === '/') {
            return true
        }
        const tenantId = request.headers['x-tenant-id']; // ヘッダーは全て小文字に変換される。
        if (tenantId !== undefined) {
            request.tenantId = tenantId;
            this.logger.debug(`canActivate(): tenantId=${tenantId}`);
            this.logger.assign({ tenantId })
            return true
        }
    }
}