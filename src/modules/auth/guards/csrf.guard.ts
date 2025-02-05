import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  CanActivate,
} from '@nestjs/common';
import { EErrors } from 'src/enum/errors.enum';

@Injectable()
export class CsrfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const csrfToken =
      request.headers['x-csrf-token'] || request.body['csrf_token'];

    if (!csrfToken) {
      throw new ForbiddenException(EErrors.CSRF_INVALID);
    }

    const csrfTokenCookie = request.cookies['csrf_token'];

    if (csrfToken !== csrfTokenCookie) {
      throw new ForbiddenException('Invalid CSRF token');
    }

    return true;
  }
}
