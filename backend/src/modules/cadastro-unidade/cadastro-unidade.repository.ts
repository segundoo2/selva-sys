import { Injectable } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service';
import { CadastroUnidadeDto } from "./cadastro-unidade.dto";

@Injectable()
export class CadastroUnidadeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUnidade(cadastroUnidadeDto: CadastroUnidadeDto) {
    const result = await this.prisma.reader.unidade.create({
      data: {
        ...cadastroUnidadeDto
      }
    });
    return result;
  }

}
