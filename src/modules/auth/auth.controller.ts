import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refesh-token.dto';
import { RefreshGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: AuthDto) {
    return {
      message: 'Seja bem-vindo ao SelvaSYS!',
      token: await this.authService.login(authDto),
    };
  }

  @UseGuards(RefreshGuard)
  @Post('refresh')
  async refreshToken(@Req() req, @Body() dto: RefreshTokenDto) {
    return await this.authService.refreshToken(req.user.sub, dto.refreshToken);
  }
}
