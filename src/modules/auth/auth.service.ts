import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { EErrors } from 'src/enum/errors.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { ...result } = user;
      return result;
    }
    throw new UnauthorizedException(EErrors.ACESS_DENIED);
  }

  async login(authDto: AuthDto) {
    const user = await this.validateUser(authDto.email, authDto.password);

    if (!user) {
      throw new Error(EErrors.INVALID_CREDENTIALS);
    }
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '1h' });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload: JwtPayload = this.jwtService.verify(refreshToken);
      const newAccessToken = this.jwtService.sign(
        {
          email: payload.email,
          sub: payload.sub,
          role: payload.role,
        },
        { expiresIn: '15m' },
      );

      return { access_token: newAccessToken };
    } catch (error) {
      throw new error(EErrors.INVALID_TOKEN);
    }
  }
}
