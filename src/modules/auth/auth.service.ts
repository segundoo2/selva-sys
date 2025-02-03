import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { EErrors } from 'src/enum/errors.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.userRepository.findByEmail(dto.email);

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException(EErrors.INVALID_CREDENTIALS);
    }

    const tokens = await this.generateTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.userRepository.findById(userId);

    if (!user || !user.refreshToken) {
      throw new ForbiddenException(EErrors.ACESS_DENIED);
    }

    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid) {
      throw new ForbiddenException(EErrors.INVALID_TOKEN);
    }

    const tokens = await this.generateTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: string) {
    return this.userRepository.logout(userId);
  }

  private generateTokens(userId: string, email: string) {
    const accessToken = this.jwtService.sign({ sub: userId, email });
    const refreshToken = this.jwtService.sign(
      { sub: userId, email },
      { expiresIn: '1h' },
    );
    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    return this.userRepository.updateRefreshToken(userId, hashedRefreshToken);
  }
}
