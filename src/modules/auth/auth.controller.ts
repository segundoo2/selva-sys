import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: AuthDto, @Res() res: Response) {
    return await this.authService.login(authDto, res);
  }

  @Post('refresh-access-token')
  async refreshAccessToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshAccessToken(req, res);
  }
}
