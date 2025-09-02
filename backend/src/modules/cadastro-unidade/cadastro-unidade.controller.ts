import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CadastroUnidadeService } from './cadastro-unidade.service';
import { CadastroUnidadeDto } from './cadastro-unidade.dto';
import { CsrfGuard } from 'auth/guards/csrf.guard';
import { RolesGuard } from 'auth/guards/roles.guard';
import { Roles } from 'auth/decorators/role.decorator';

@Controller('cadastro-unidade')
export class CadastroUnidadeController {
  constructor(private readonly cadastroUnidadeService: CadastroUnidadeService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(CsrfGuard, RolesGuard)
  @Roles('admin', 'diretor', 'secretario')
  async createUnidade(@Body() cadastroUnidadeDto: CadastroUnidadeDto) {
    return await this.cadastroUnidadeService.createUnidade(cadastroUnidadeDto);
  }
}
