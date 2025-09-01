import { BadRequestException, Injectable } from '@nestjs/common';
import CreateCadastroDbvDto from './cadastro-dbv.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CadastroDbvRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createDbv(createCadastroDbvDto: CreateCadastroDbvDto) {
    if (!createCadastroDbvDto) {
      throw new BadRequestException('Dados inválidos.');
    }
    const result = await this.prisma.write.cadastroDbv.create({
      data: createCadastroDbvDto,
    });

    console.log(result.classes, '--- classes ---', result.especialidades, '--- especialidades ---');
    return result;
  }

  async findDbvByMatricula(matricula: number) {
    return await this.prisma.write.cadastroDbv.findUnique({
      where: { matricula },
    });
  }


  async findDbvByCpf(cpf: string) {
    return await this.prisma.reader.cadastroDbv.findUnique({
      where: { cpf },
    });
  }

  async findDbvByRg(rg: string) {
    return await this.prisma.reader.cadastroDbv.findUnique({
      where: { rg },
    });
  }

  async findAllDbvs() {
    return await this.prisma.reader.cadastroDbv.findMany();
  }

  async updateDbvByMatricula(matricula: number, updateCadastroDbvDto: CreateCadastroDbvDto) {
    await this.prisma.write.cadastroDbv.update({
      where: { matricula },
      data: updateCadastroDbvDto,
    });

    return { message: `Desbravador da matrícula: ${matricula} atualizado com sucesso.`};
  }

  async deleteDbvByMatricula(matricula: number) {
    await this.prisma.delete.cadastroDbv.delete({
      where: { matricula },
    });

    return { message: `Desbravador da matrícula: ${matricula} deletado com sucesso.`};
  }
}
