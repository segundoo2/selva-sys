import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AdminService', () => {
  let service: AdminService;
  let repository: AdminRepository;

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

  const mockAdminRepository = {
    createUser: jest.fn(),
    findAllUsers: jest.fn(),
    updateUser: jest.fn(),
    resetPassword: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: AdminRepository,
          useValue: mockAdminRepository,
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
    repository = module.get<AdminRepository>(AdminRepository);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
      const hashedPassword = 'hashedPassword';
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockAdminRepository.createUser.mockResolvedValue(mockUser);

      await service.createUser(createUserDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(repository.createUser).toHaveBeenCalledWith({
        ...createUserDto,
        password: hashedPassword,
      });
    });

    it('should propagate errors from repository', async () => {
      const error = new Error('Repository error');
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      mockAdminRepository.createUser.mockRejectedValue(error);

      await expect(service.createUser(createUserDto)).rejects.toThrow(error);
    });
  });

  describe('findAllUsers', () => {
    it('should return all users when no email filter is provided', async () => {
      const users = [mockUser];
      mockAdminRepository.findAllUsers.mockResolvedValue(users);

      const result = await service.findAllUsers('');

      expect(result).toEqual(users);
      expect(repository.findAllUsers).toHaveBeenCalledWith({});
    });

    it('should return filtered users when email is provided', async () => {
      const users = [mockUser];
      const email = 'test@example.com';
      mockAdminRepository.findAllUsers.mockResolvedValue(users);

      const result = await service.findAllUsers(email);

      expect(result).toEqual(users);
      expect(repository.findAllUsers).toHaveBeenCalledWith({
        email: { contains: email, mode: 'insensitive' },
      });
    });
  });

  describe('updateUser', () => {
    const updateUserDto = {
      name: 'Updated Name',
      password: 'newPassword123',
    };

    it('should update user successfully', async () => {
      const hashedPassword = 'newHashedPassword';
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockAdminRepository.updateUser.mockResolvedValue(mockUser);

      await service.updateUser('1', updateUserDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('newPassword123', 10);
      expect(repository.updateUser).toHaveBeenCalledWith('1', {
        ...updateUserDto,
        password: hashedPassword,
      });
    });
  });

  describe('resetPassword', () => {
    const resetPasswordDto = {
      password: 'newPassword123',
    };

    it('should reset password successfully', async () => {
      const hashedPassword = 'newHashedPassword';
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockAdminRepository.resetPassword.mockResolvedValue(mockUser);

      await service.resetPassword('1', resetPasswordDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('newPassword123', 10);
      expect(repository.resetPassword).toHaveBeenCalledWith(
        '1',
        hashedPassword,
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      mockAdminRepository.deleteUser.mockResolvedValue(mockUser);

      await service.deleteUser('1');

      expect(repository.deleteUser).toHaveBeenCalledWith('1');
    });

    it('should propagate errors from repository', async () => {
      const error = new Error('Repository error');
      mockAdminRepository.deleteUser.mockRejectedValue(error);

      await expect(service.deleteUser('1')).rejects.toThrow(error);
    });
  });
});
