import { CadastroDbvService } from './cadastro-dbv.service';
import { CadastroDbvRepository } from './cadastro-dbv.repository';

describe('CadastroDbvService', () => {
  let service: CadastroDbvService;
  let repository: any;

  beforeEach(() => {
    repository = {
      createDbv: jest.fn(),
      findDbvByMatricula: jest.fn(),
      findAllDbvs: jest.fn(),
      updateDbvByMatricula: jest.fn(),
      deleteDbvByMatricula: jest.fn(),
    };
    service = new CadastroDbvService(repository);
  });

  it('deve criar dbv', async () => {
    repository.createDbv.mockResolvedValue('created');
    expect(await service.createDbv({} as any)).toBe('created');
  });

  it('deve buscar dbv por matrícula', async () => {
    repository.findDbvByMatricula.mockResolvedValue('found');
    expect(await service.findDbvByMatricula(1)).toBe('found');
  });

  it('deve buscar todos os dbvs', async () => {
    repository.findAllDbvs.mockResolvedValue(['all']);
    expect(await service.findAllDbvs()).toEqual(['all']);
  });

  it('deve atualizar dbv por matrícula', async () => {
    repository.findDbvByMatricula.mockResolvedValue({}); // Mock found desbravador
    repository.updateDbvByMatricula.mockResolvedValue('updated');
    expect(await service.updateDbvByMatricula(1, {} as any)).toBe('updated');
  });

  it('deve deletar dbv por matrícula', async () => {
    repository.deleteDbvByMatricula.mockResolvedValue('deleted');
    expect(await service.deleteDbvByMatricula(1)).toBe('deleted');
  });
});
