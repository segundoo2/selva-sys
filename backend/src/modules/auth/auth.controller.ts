import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from './guards/access-token.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login do usuário' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  @Post('login')
  @HttpCode(200)
  async login(@Body() authDto: AuthDto, @Res() res: Response) {
    
    return await this.authService.login(authDto, res);
  }

  @ApiOperation({ summary: 'Validar sessão do usuário' })
  @ApiResponse({ status: 200, description: 'Sessão válida' })
  @ApiResponse({
    status: 401,
    description: 'Sessão inválida ou token expirado',
  })
  @ApiBearerAuth()
  @Get('validate-session')
  @UseGuards(AccessTokenGuard)
  async validateSession(@Res() res: Response) {
    return res.status(200);
  }

  @ApiOperation({ summary: 'Atualizar tokens de acesso' })
  @ApiResponse({ status: 200, description: 'Tokens atualizados com sucesso' })
  @ApiResponse({
    status: 401,
    description: 'Refresh token inválido ou expirado',
  })
  @Post('refresh-tokens')
  async refreshAccessToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshAccessToken(req, res);
  }
}
