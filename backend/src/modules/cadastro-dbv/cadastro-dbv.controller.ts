import { BadRequestException, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CadastroDbvService } from './cadastro-dbv.service';
import CreateCadastroDbvDto from './cadastro-dbv.dto';
import { Roles } from '../auth/decorators/role.decorator';
import { CsrfGuard } from '../auth/guards/csrf.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('cadastro-dbv')
export class CadastroDbvController {
  constructor(private readonly cadastroDbvService: CadastroDbvService) {}

  @Roles('admin', 'diretor', 'secretario')
  @UseGuards(CsrfGuard, RolesGuard)
  @Post()
  createDbv(@Body() createCadastroDbvDto: CreateCadastroDbvDto) {
    if (!createCadastroDbvDto) {
      throw new BadRequestException('Dados inválidos');
    }
    return this.cadastroDbvService.createDbv(createCadastroDbvDto);
  }
}
