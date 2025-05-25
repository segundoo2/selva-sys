import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  CanActivate,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EErrors } from '@/enum/errors.enum';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.cookies['access_token'];

    if (!accessToken) {
      throw new ForbiddenException(EErrors.CSRF_INVALID);
    }

    try {
      await this.jwtService.verify(accessToken);
      return true;
    } catch {
      return false;
    }
  }
}
