import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
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
  async createDbv(@Body() createCadastroDbvDto: CreateCadastroDbvDto) {
    if (!createCadastroDbvDto) {
      throw new BadRequestException('Dados inválidos');
    }
    return this.cadastroDbvService.createDbv(createCadastroDbvDto);
  }

  @Roles('admin', 'diretor', 'secretario')
  @UseGuards(CsrfGuard, RolesGuard)
  @Get('/all')
  async findAllDbvs() {
    return this.cadastroDbvService.findAllDbvs();
  }

  @Roles('admin', 'diretor', 'secretario')
  @UseGuards(CsrfGuard, RolesGuard)
  @Get('/:matricula')
  async findDbvByMatricula(@Param('matricula') matricula: string) {
    return this.cadastroDbvService.findDbvByMatricula(Number(matricula));
  }

  @Roles('admin', 'diretor', 'secretario')
  @UseGuards(CsrfGuard, RolesGuard)
  @Patch('/atualizar/:matricula')
  async updateDbvByMatricula(
    @Param('matricula') matricula: number,
    @Body() updateCadastroDbvDto: CreateCadastroDbvDto,
  ) {
    return this.cadastroDbvService.updateDbvByMatricula(
      matricula,
      updateCadastroDbvDto,
    );
  }

  @Roles('admin', 'diretor', 'secretario')
  @UseGuards(CsrfGuard, RolesGuard)
  @Delete('/deletar/:matricula')
  async deleteDbvByMatricula(@Param('matricula') matricula: number) {
    return this.cadastroDbvService.deleteDbvByMatricula(matricula);
  }
}
