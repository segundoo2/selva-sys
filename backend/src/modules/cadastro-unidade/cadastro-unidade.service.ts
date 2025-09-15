import { Injectable } from '@nestjs/common';
import { CadastroUnidadeDto } from './cadastro-unidade.dto';
import { CadastroUnidadeRepository } from './cadastro-unidade.repository';

@Injectable()
export class CadastroUnidadeService {
  constructor(private readonly cadastroUnidadeRepository: CadastroUnidadeRepository) {}
  async createUnidade(cadastroUnidadeDto: CadastroUnidadeDto) {
    const result = await this.cadastroUnidadeRepository.createUnidade(cadastroUnidadeDto);
  }
}
