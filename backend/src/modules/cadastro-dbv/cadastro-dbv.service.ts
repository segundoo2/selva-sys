// cadastro-dbv.service.ts

import { BadRequestException, Injectable } from '@nestjs/common';
import CreateCadastroDbvDto from './cadastro-dbv.dto';
import { CadastroDbvRepository } from './cadastro-dbv.repository';
// Importe o gerador de utilidade (certifique-se de que o caminho '..' para utils/MatriculaGenerator esteja correto)
import { generateMatricula } from '../../util/matricula-generate.util'; 

@Injectable()
export class CadastroDbvService {
  constructor(private readonly cadastroDbvRepository: CadastroDbvRepository) {}

  /**
   * Tenta gerar uma matrícula única (number) de 6 dígitos, checando a unicidade no repositório.
   * Repete a geração se a matrícula já existir, limitando o número de tentativas.
   * @returns {Promise<number>} Matrícula única.
   */
  private async generateUniqueMatricula(): Promise<number> {
    let matricula: number;
    let isUnique = false;
    let attempts = 0;
    const MAX_ATTEMPTS = 10; 

    while (!isUnique && attempts < MAX_ATTEMPTS) {
      // Gera um número aleatório de 6 dígitos
      matricula = generateMatricula(); 
      
      const existingDbv = await this.cadastroDbvRepository.findDbvByMatricula(matricula);
      
      if (!existingDbv) {
        isUnique = true;
        return matricula; // Retorna o number único
      }
      attempts++;
    }

    // Se o loop falhar após 10 tentativas, lança um erro para evitar loop infinito
    if (!isUnique) {
      throw new BadRequestException('Não foi possível gerar uma matrícula única após várias tentativas. Tente novamente.');
    }
  }


  async createDbv(createCadastroDbvDto: CreateCadastroDbvDto) {
    if(!createCadastroDbvDto) {
      throw new BadRequestException('Dados inválidos') ;
    }

    // 1. Gerar e obter uma matrícula única
    const uniqueMatricula = await this.generateUniqueMatricula();

    // 2. Adicionar a matrícula ao DTO antes de salvar.
    // Isso garante que o Desbravador seja salvo com o ID gerado.
    const dbvToCreate = {
      ...createCadastroDbvDto,
      matricula: uniqueMatricula,
    };
    
    // 3. Salva o desbravador.
    return this.cadastroDbvRepository.createDbv(dbvToCreate);
  }

  async findAllDbvs() {
    const findAllDbvs = await this.cadastroDbvRepository.findAllDbvs();
    if (!findAllDbvs || findAllDbvs.length === 0) {
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

    // Se o DTO de atualização contiver a matrícula, ela será ignorada ou sobrescrita
    // pelo seu ORM/Repository, mas para clareza:
    const dbvToUpdate = {
        ...updateCadastroDbvDto,
        matricula: matricula, // Garante que a matrícula usada seja a da URL
    };


    const updateDbvByMatricula = await this.cadastroDbvRepository.updateDbvByMatricula(matricula, dbvToUpdate);
    if (!updateDbvByMatricula) {
      throw new BadRequestException('Erro ao atualizar o desbravador.');
    }
    return updateDbvByMatricula;
  }

  async deleteDbvByMatricula(matricula: number) {
    const deleteDbvByMatricula = await this.cadastroDbvRepository.deleteDbvByMatricula(matricula);
    // Assumindo que o repository retorna o objeto deletado (ou o número de linhas afetadas > 0)
    if (!deleteDbvByMatricula) {
      throw new BadRequestException('Desbravador não encontrado.');
    }
    return deleteDbvByMatricula;
  }
}