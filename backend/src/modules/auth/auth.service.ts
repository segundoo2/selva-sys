import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EErrors } from 'src/enum/errors.enum';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { AuthDto } from './dto/auth.dto';
import { setCookies } from 'src/util/set-cookies.util';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private authRepository: AuthRepository,
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
    const accessToken = this.jwtService.sign(payload, { expiresIn: '5m' });

    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    const csrfToken = crypto.randomBytes(64).toString('hex');

    res.cookie('csrf_token', csrfToken, {
      secure: true,
      httpOnly: false,
      maxAge: 7 * 24 * 60 * 1000,
      sameSite: 'strict',
    });

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
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
      message: 'Login feito com sucesso!',
    });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.authRepository.findByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async refreshAccessToken(req, res) {
    const csrfToken = req.headers['x-csrf-token'] as string;
    const refreshToken = req.cookies.refresh_token;

    const csrfTokenCookie = req.cookies['csrf_token'];

    if (csrfToken !== csrfTokenCookie) {
      throw new ForbiddenException(EErrors.CSRF_INVALID);
    }

    if (!csrfToken) {
      throw new UnauthorizedException(EErrors.CSRF_INVALID);
    }

    if (!refreshToken) {
      throw new UnauthorizedException(EErrors.REFRESH_TOKEN_INVALID);
    }

    const decodedRefreshToken = await this.jwtService
      .verifyAsync(refreshToken)
      .catch(() => {
        throw new UnauthorizedException(EErrors.REFRESH_TOKEN_INVALID);
      });

    const newAccessToken = this.generateAccessToken(
      decodedRefreshToken.userId,
      decodedRefreshToken.email,
      decodedRefreshToken.role,
    );
    const newRefreshToken = this.generateRefreshToken(
      decodedRefreshToken.userId,
      decodedRefreshToken.email,
      decodedRefreshToken.role,
    );
    const newCsrfToken = this.generateCsrfToken();

    setCookies(res, [
      {
        name: 'refresh_token',
        value: newRefreshToken,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
      {
        name: 'access_token',
        value: newAccessToken,
        maxAge: 1 * 60 * 60 * 1000,
      },
      {
        name: 'csrf_token',
        value: newCsrfToken,
        maxAge: 1 * 60 * 60 * 1000,
        httpOnly: false,
      },
    ]);

    return res.json({ new_csrf_token: newCsrfToken });
  }

  generateCsrfToken() {
    return crypto.randomBytes(64).toString('hex');
  }
  generateAccessToken(userId: string, email: string, role: string) {
    const payload = { userId, email, role };
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }

  generateRefreshToken(userId: string, email: string, role: string) {
    const payload = { userId, email, role };
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }
}
