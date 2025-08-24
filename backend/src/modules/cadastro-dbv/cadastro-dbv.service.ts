import { BadRequestException, Injectable } from '@nestjs/common';
import CreateCadastroDbvDto from './cadastro-dbv.dto';
import { CadastroDbvRepository } from './cadastro-dbv.repository';

@Injectable()
export class CadastroDbvService {
  constructor(private readonly cadastroDbvRepository: CadastroDbvRepository) {}

  createDbv(createCadastroDbvDto: CreateCadastroDbvDto) {
    if(!createCadastroDbvDto) {
      throw new BadRequestException('Dados inválidos') ;
    }
    return this.cadastroDbvRepository.createDbv(createCadastroDbvDto);
  }
}
