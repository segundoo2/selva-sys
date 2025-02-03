import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const tokens = await this.generateTokens(user.id, user.email);
    await this.refreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.userRepository.findById(userId);

    if (!user || !user.refeshToken) {
      throw new ForbiddenException('Acesso negado');
    }

    const isValid = await bcrypt.compare(refreshToken, user.refeshToken);
    if (!isValid) {
      throw new ForbiddenException('Token inválido');
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
      { expiresIn: '30min' },
    );
    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    return this.userRepository.updateRefreshToken(userId, refreshToken);
  }
}
