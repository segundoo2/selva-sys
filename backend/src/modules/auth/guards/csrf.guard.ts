import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  CanActivate,
} from '@nestjs/common';
import { EErrors } from '../../../enum/errors.enum';

@Injectable()
export class CsrfGuard implements CanActivate {

  private readonly cookieName = 'csrfToken';

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const csrfToken =
      request.headers['x-csrf-token'];

    if (!csrfToken) {
      throw new ForbiddenException(EErrors.CSRF_INVALID);
    }

    const csrfTokenCookie = request.cookies[this.cookieName];

    if (!csrfTokenCookie) {
      throw new ForbiddenException(EErrors.CSRF_INVALID);
    }

    if (csrfToken !== csrfTokenCookie) {
      throw new ForbiddenException(EErrors.CSRF_INVALID);
    }

    return true;
  }
}
