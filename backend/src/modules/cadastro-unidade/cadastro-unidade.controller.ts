import { Controller } from '@nestjs/common';
import { CadastroUnidadeService } from './cadastro-unidade.service';

@Controller('cadastro-unidade')
export class CadastroUnidadeController {
  constructor(private readonly cadastroUnidadeService: CadastroUnidadeService) {}
}
