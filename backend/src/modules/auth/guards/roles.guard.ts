import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from '../decorators/role.decorator';
import { Request } from 'express';
import { EErrors } from '@/enum/errors.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies.access_token;

    if (!token) {
      throw new UnauthorizedException(EErrors.ACCESS_TOKEN_INVALID);
    }

    // A verificação assíncrona do token
    const decodedToken = await this.jwtService
      .verifyAsync(token)
      .catch((error) => {
        if (error.name === 'TokenExpiredError') {
          throw new ForbiddenException(EErrors.ACCESS_TOKEN_INVALID);
        }
        if (error.name === 'JsonWebTokenError') {
          throw new ForbiddenException(EErrors.ACCESS_TOKEN_INVALID);
        }
        throw new ForbiddenException(EErrors.VERIFICATION_TOKEN);
      });

    const userRole = decodedToken.role;

    if (!userRole) {
      throw new UnauthorizedException(EErrors.ROLE_NOT_FOUND);
    }

    if (!requiredRoles.includes(userRole)) {
      throw new ForbiddenException(EErrors.ACCESS_DENIED);
    }

    return true;
  }
}
