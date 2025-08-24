import { Injectable } from '@nestjs/common';
import CreateCadastroDbvDto from './cadastro-dbv.dto';
import { CadastroDbvRepository } from './cadastro-dbv.repository';

@Injectable()
export class CadastroDbvService {
  constructor(private readonly cadastroDbvRepository: CadastroDbvRepository) {}

  createDbv(createCadastroDbvDto: CreateCadastroDbvDto) {
    return this.cadastroDbvRepository.createDbv(createCadastroDbvDto);
  }
}
