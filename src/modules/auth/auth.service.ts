import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { EErrors } from 'src/enum/errors.enum';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async login(authDto: AuthDto, res: any) {
    const user = await this.validateUser(authDto.email, authDto.password);
    if (!user) {
      throw new UnauthorizedException(EErrors.INVALID_CREDENTIALS);
    }
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

    const refreshToken = this.jwtService.sign(payload, { expiresIn: '15m' });

    const csrfToken = crypto.randomBytes(64).toString('hex');

    res.cookie('csrf_token', csrfToken, {
      secure: true,
      httpOnly: false,
      maxAge: 7 * 24 * 60 * 1000,
      sameSite: 'strict',
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 1000,
      sameSite: 'strict',
    });

    return res.json({
      access_token: accessToken,
      csrf_token: csrfToken,
    });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
