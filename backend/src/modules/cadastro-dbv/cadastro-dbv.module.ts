import { Module } from '@nestjs/common';
import { CadastroDbvService } from './cadastro-dbv.service';
import { CadastroDbvController } from './cadastro-dbv.controller';
import { CadastroDbvRepository } from './cadastro-dbv.repository';

@Module({
  controllers: [CadastroDbvController],
  providers: [CadastroDbvService, CadastroDbvRepository],
})
export class CadastroDbvModule {}
