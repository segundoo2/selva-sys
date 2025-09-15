import { Module } from '@nestjs/common';
import { CadastroUnidadeService } from './cadastro-unidade.service';
import { CadastroUnidadeController } from './cadastro-unidade.controller';

@Module({
  controllers: [CadastroUnidadeController],
  providers: [CadastroUnidadeService],
})
export class CadastroUnidadeModule {}
