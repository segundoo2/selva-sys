/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ForbiddenException, Injectable, CanActivate } from '@nestjs/common';
import { Request } from 'express';
import { EErrors } from '../../../enum/errors.enum';

@Injectable()
export class CsrfGuard implements CanActivate {
  canActivate(context: import('@nestjs/common').ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const csrfTokenHeaders = request.headers['x-csrf-token'] as
      | string
      | undefined;

    if (!csrfTokenHeaders) {
      throw new ForbiddenException(EErrors.CSRF_INVALID);
    }

    const csrfTokenCookie = request.cookies?.['csrf_token'];

    if (!csrfTokenCookie) {
      throw new ForbiddenException(EErrors.CSRF_INVALID);
    }

    if (csrfTokenHeaders !== csrfTokenCookie) {
      throw new ForbiddenException(EErrors.ACCESS_DENIED);
    }

    return true;
  }
}
