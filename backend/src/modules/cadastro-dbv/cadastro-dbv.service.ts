import { BadRequestException, Injectable } from '@nestjs/common';
import CreateCadastroDbvDto from './cadastro-dbv.dto';
import { CadastroDbvRepository } from './cadastro-dbv.repository';

@Injectable()
export class CadastroDbvService {
  constructor(private readonly cadastroDbvRepository: CadastroDbvRepository) {}

  async createDbv(createCadastroDbvDto: CreateCadastroDbvDto) {
    if(!createCadastroDbvDto) {
      throw new BadRequestException('Dados inválidos') ;
    }

    const findDbvByMatricula = await this.cadastroDbvRepository.findDbvByMatricula(createCadastroDbvDto.matricula);
    if (findDbvByMatricula) {
      throw new BadRequestException('Desbravador já cadastrado.');
    }

    return this.cadastroDbvRepository.createDbv(createCadastroDbvDto);
  }

  async findDbvByMatricula(matricula: number) {
    const findDbvByMatricula = await this.cadastroDbvRepository.findDbvByMatricula(matricula);
    if (!findDbvByMatricula) {
      throw new BadRequestException('Desbravador não encontrado.');
    }
    return findDbvByMatricula;
  }

  async findAllDbvs() {
    const findAllDbvs = await this.cadastroDbvRepository.findAllDbvs();
    if (!findAllDbvs) {
      throw new BadRequestException('Nenhum desbravador encontrado.');
    }
    return findAllDbvs;
  }

  async updateDbvByMatricula(matricula: number, updateCadastroDbvDto: CreateCadastroDbvDto) {
    if (!updateCadastroDbvDto) {
      throw new BadRequestException('Dados inválidos.');
    }

    const findDbvByMatricula = await this.cadastroDbvRepository.findDbvByMatricula(matricula);
    if (!findDbvByMatricula) {
      throw new BadRequestException('Desbravador não encontrado.');
    }

    const updateDbvByMatricula = await this.cadastroDbvRepository.updateDbvByMatricula(matricula, updateCadastroDbvDto);
    if (!updateDbvByMatricula) {
      throw new BadRequestException('Desbravador não encontrado.');
    }
    return updateDbvByMatricula;
  }

  async deleteDbvByMatricula(matricula: number) {
    const deleteDbvByMatricula = await this.cadastroDbvRepository.deleteDbvByMatricula(matricula);
    if (!deleteDbvByMatricula) {
      throw new BadRequestException('Desbravador não encontrado.');
    }
    return deleteDbvByMatricula;
  }

}
