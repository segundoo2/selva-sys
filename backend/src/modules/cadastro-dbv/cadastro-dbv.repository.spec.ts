import { CadastroDbvRepository } from './cadastro-dbv.repository';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('CadastroDbvRepository', () => {
  let repository: CadastroDbvRepository;
  let prisma: any;

  beforeEach(() => {
    prisma = {
      write: {
        cadastroDbv: {
          create: jest.fn(),
          findUnique: jest.fn(),
          findMany: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        },
      },
    };
    repository = new CadastroDbvRepository(prisma);
  });

  it('deve criar um dbv', async () => {
    const dto = { numero: 1 } as any;
    prisma.write.cadastroDbv.create.mockResolvedValue(dto);
    const result = await repository.createDbv(dto);
    expect(result).toBe(dto);
    expect(prisma.write.cadastroDbv.create).toHaveBeenCalledWith({ data: dto });
  });

  it('deve lançar BadRequestException se dto for nulo', async () => {
    await expect(repository.createDbv(null)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('deve buscar dbv por matrícula', async () => {
    prisma.write.cadastroDbv.findUnique.mockResolvedValue({ matricula: 1 });
    const result = await repository.findDbvByMatricula(1);
    expect(result).toEqual({ matricula: 1 });
  });

  it('deve buscar todos os dbvs', async () => {
    prisma.write.cadastroDbv.findMany.mockResolvedValue([{}]);
    const result = await repository.findAllDbvs();
    expect(result).toEqual([{}]);
  });

  it('deve atualizar dbv por matrícula', async () => {
    prisma.write.cadastroDbv.update.mockResolvedValue({ matricula: 1 });
    const result = await repository.updateDbvByMatricula(1, {
      numero: 1,
    } as any);
    expect(result).toEqual({ matricula: 1 });
  });

  it('deve deletar dbv por matrícula', async () => {
    prisma.write.cadastroDbv.delete.mockResolvedValue({ matricula: 1 });
    const result = await repository.deleteDbvByMatricula(1);
    expect(result).toEqual({ matricula: 1 });
  });
});
