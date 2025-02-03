import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: process.env.REFRESH_SECRET || 'REFRESH_SECRET',
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    if (!req.body || !req.body.refreshToken) {
      throw new UnauthorizedException('Refresh token não encontrado');
    }
    return { ...payload, refreshToken: req.body.refreshToken };
  }
}
