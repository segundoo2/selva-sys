import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from './guards/access-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: AuthDto, @Res() res: Response) {
    return await this.authService.login(authDto, res);
  }

  @Get('validate-session')
  @UseGuards(AccessTokenGuard)
  async validateSession(@Res() res: Response) {
    return res.status(200);
  }

  @Post('refresh-tokens')
  async refreshAccessToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshAccessToken(req, res);
  }
}
