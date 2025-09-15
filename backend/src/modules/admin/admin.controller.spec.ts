import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { CsrfGuard } from '../auth/guards/csrf.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

describe('AdminController', () => {
  let controller: AdminController;
  let service: AdminService;

  const mockUser = {
    id: '1',
    email: 'test@example.com',
    password: 'hashedPassword',
    role: 'admin' as
      | 'admin'
      | 'diretor'
      | 'secretario'
      | 'tesoureiro'
      | 'instrutor',
    name: 'Test User',
  };

  const mockAdminService = {
    createUser: jest.fn(),
    findAllUsers: jest.fn(),
    updateUser: jest.fn(),
    resetPassword: jest.fn(),
    deleteUser: jest.fn(),
  };

  const mockJwtService = {
    verifyAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: AdminService,
          useValue: mockAdminService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        Reflector,
        RolesGuard,
        CsrfGuard,
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    const createUserDto = {
      email: 'test@example.com',
      password: 'password123',
      role: 'admin' as
        | 'admin'
        | 'diretor'
        | 'secretario'
        | 'tesoureiro'
        | 'instrutor',
      name: 'Test User',
    };

    it('should create a user successfully', async () => {
      mockAdminService.createUser.mockResolvedValue(mockUser);

      const result = await controller.createUser(createUserDto);

      expect(result).toBe('Usuário criado com sucesso!');
      expect(service.createUser).toHaveBeenCalledWith(createUserDto);
    });

    it('should propagate errors from service', async () => {
      const error = new Error('Service error');
      mockAdminService.createUser.mockRejectedValue(error);

      await expect(controller.createUser(createUserDto)).rejects.toThrow(error);
    });
  });

  describe('findAllUsers', () => {
    it('should return all users when no email filter is provided', async () => {
      const users = [mockUser];
      mockAdminService.findAllUsers.mockResolvedValue(users);

      const result = await controller.findAllUsers();

      expect(result).toEqual(users);
      expect(service.findAllUsers).toHaveBeenCalledWith(undefined);
    });

    it('should return filtered users when email is provided', async () => {
      const users = [mockUser];
      const email = 'test@example.com';
      mockAdminService.findAllUsers.mockResolvedValue(users);

      const result = await controller.findAllUsers(email);

      expect(result).toEqual(users);
      expect(service.findAllUsers).toHaveBeenCalledWith(email);
    });
  });

  describe('updateUser', () => {
    const updateUserDto = {
      name: 'Updated Name',
      password: 'newPassword123',
    };

    it('should update user successfully', async () => {
      mockAdminService.updateUser.mockResolvedValue(mockUser);

      const result = await controller.updateUser('1', updateUserDto);

      expect(result).toBe('Usuário atualizado com sucesso!');
      expect(service.updateUser).toHaveBeenCalledWith('1', updateUserDto);
    });

    it('should propagate errors from service', async () => {
      const error = new Error('Service error');
      mockAdminService.updateUser.mockRejectedValue(error);

      await expect(controller.updateUser('1', updateUserDto)).rejects.toThrow(
        error,
      );
    });
  });

  describe('resetPassword', () => {
    const resetPasswordDto = {
      password: 'newPassword123',
    };

    it('should reset password successfully', async () => {
      mockAdminService.resetPassword.mockResolvedValue(mockUser);

      const result = await controller.resetPassword('1', resetPasswordDto);

      expect(result).toBe('Senha atualizada com sucesso!');
      expect(service.resetPassword).toHaveBeenCalledWith('1', resetPasswordDto);
    });

    it('should propagate errors from service', async () => {
      const error = new Error('Service error');
      mockAdminService.resetPassword.mockRejectedValue(error);

      await expect(
        controller.resetPassword('1', resetPasswordDto),
      ).rejects.toThrow(error);
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      mockAdminService.deleteUser.mockResolvedValue(mockUser);

      const result = await controller.deleteUser('1');

      expect(result).toBe('Usuário deletado com sucesso!');
      expect(service.deleteUser).toHaveBeenCalledWith('1');
    });

    it('should propagate errors from service', async () => {
      const error = new Error('Service error');
      mockAdminService.deleteUser.mockRejectedValue(error);

      await expect(controller.deleteUser('1')).rejects.toThrow(error);
    });
  });
});
