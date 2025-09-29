import { BadRequestException, Injectable } from '@nestjs/common';
import CreateCadastroDbvDto from './cadastro-dbv.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CadastroDbvRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createDbv(createCadastroDbvDto: { matricula: number } & CreateCadastroDbvDto) {
    if (!createCadastroDbvDto) {
      throw new BadRequestException('Dados inválidos.');
    }
    return await this.prisma.write.cadastroDbv.create({
      data: createCadastroDbvDto,
    });
  }

  async findDbvByMatricula(matricula: number) {
    return await this.prisma.write.cadastroDbv.findUnique({
      where: { matricula },
    });
  }

  async findAllDbvs() {
    return await this.prisma.write.cadastroDbv.findMany();
  }

  async updateDbvByMatricula(matricula: number, updateCadastroDbvDto: CreateCadastroDbvDto) {
    return await this.prisma.write.cadastroDbv.update({
      where: { matricula },
      data: updateCadastroDbvDto,
    });
  }

  async deleteDbvByMatricula(matricula: number) {
    return await this.prisma.write.cadastroDbv.delete({
      where: { matricula },
    });
  }
}
