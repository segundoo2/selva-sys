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
      throw new UnauthorizedException('Access token is missing.');
    }

    // A verificação assíncrona do token
    const decodedToken = await this.jwtService
      .verifyAsync(token)
      .catch((error) => {
        if (error.name === 'TokenExpiredError') {
          throw new ForbiddenException('Token expired.');
        }
        if (error.name === 'JsonWebTokenError') {
          throw new ForbiddenException('Invalid token.');
        }
        throw new ForbiddenException('Token verification failed.');
      });

    const userRole = decodedToken?.role;

    if (!userRole) {
      throw new UnauthorizedException('User role not found in token.');
    }

    if (!requiredRoles.includes(userRole)) {
      throw new ForbiddenException(
        'You do not have permission to access this resource.',
      );
    }

    return true;
  }
}
