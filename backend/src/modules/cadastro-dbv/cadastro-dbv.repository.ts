import { Injectable } from '@nestjs/common';
import CreateCadastroDbvDto from './cadastro-dbv.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CadastroDbvRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createDbv(createCadastroDbvDto: CreateCadastroDbvDto) {
    return await this.prisma.write.cadastroDbv.create({
      data: createCadastroDbvDto,
    });
  }
}
