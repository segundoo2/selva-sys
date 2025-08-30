import { CadastroDbvController } from './cadastro-dbv.controller';
import { CadastroDbvService } from './cadastro-dbv.service';
import { BadRequestException } from '@nestjs/common';

describe('CadastroDbvController', () => {
  let controller: CadastroDbvController;
  let service: any;

  beforeEach(() => {
    service = {
      createDbv: jest.fn(),
      findDbvByMatricula: jest.fn(),
      findAllDbvs: jest.fn(),
      updateDbvByMatricula: jest.fn(),
      deleteDbvByMatricula: jest.fn(),
    };
    controller = new CadastroDbvController(service);
  });

  it('deve criar dbv', async () => {
    service.createDbv.mockResolvedValue('created');
    expect(await controller.createDbv({} as any)).toBe('created');
  });

  it('deve lançar BadRequestException se dto for nulo', async () => {
    await expect(controller.createDbv(null)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('deve buscar dbv por matrícula', async () => {
    service.findDbvByMatricula.mockResolvedValue('found');
    expect(await controller.findDbvByMatricula(1)).toBe('found');
  });

  it('deve buscar todos os dbvs', async () => {
    service.findAllDbvs.mockResolvedValue(['all']);
    expect(await controller.findAllDbvs()).toEqual(['all']);
  });

  it('deve atualizar dbv por matrícula', async () => {
    service.updateDbvByMatricula.mockResolvedValue('updated');
    expect(await controller.updateDbvByMatricula(1, {} as any)).toBe('updated');
  });

  it('deve deletar dbv por matrícula', async () => {
    service.deleteDbvByMatricula.mockResolvedValue('deleted');
    expect(await controller.deleteDbvByMatricula(1)).toBe('deleted');
  });
});
