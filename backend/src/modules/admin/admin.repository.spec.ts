import { Test, TestingModule } from '@nestjs/testing';
import { AdminRepository } from './admin.repository';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { EErrors } from '@/enum/errors.enum';

describe('AdminRepository', () => {
  let repository: AdminRepository;
  let prismaService: PrismaService;

  const mockUser = {
    id: '1',
    email: 'test@example.com',
    password: 'hashedPassword',
    role: 'admin',
    name: 'Test User',
  };

  const mockPrismaService = {
    read: {
      user: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
      },
    },
    write: {
      user: {
        create: jest.fn(),
        update: jest.fn(),
      },
    },
    delete: {
      user: {
        delete: jest.fn(),
      },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    repository = module.get<AdminRepository>(AdminRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
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
      mockPrismaService.read.user.findUnique.mockResolvedValue(null);
      mockPrismaService.write.user.create.mockResolvedValue(mockUser);

      await repository.createUser(createUserDto);

      expect(mockPrismaService.write.user.create).toHaveBeenCalledWith({
        data: createUserDto,
      });
    });

    it('should throw ConflictException when email already exists', async () => {
      mockPrismaService.read.user.findUnique.mockResolvedValue(mockUser);

      await expect(repository.createUser(createUserDto)).rejects.toThrow(
        new ConflictException(EErrors.EMAIL_EXIST),
      );
    });
  });

  describe('findAllUsers', () => {
    it('should return all users', async () => {
      const users = [mockUser];
      mockPrismaService.read.user.findMany.mockResolvedValue(users);

      const result = await repository.findAllUsers({});

      expect(result).toEqual(users);
      expect(mockPrismaService.read.user.findMany).toHaveBeenCalledWith({
        where: {},
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
    });
  });

  describe('verifyUserExist', () => {
    it('should not throw error when user exists', async () => {
      mockPrismaService.read.user.findUnique.mockResolvedValue(mockUser);

      await expect(repository.verifyUserExist('1')).resolves.not.toThrow();
    });

    it('should throw NotFoundException when user does not exist', async () => {
      mockPrismaService.read.user.findUnique.mockResolvedValue(null);

      await expect(repository.verifyUserExist('1')).rejects.toThrow(
        new NotFoundException(EErrors.USER_NOT_FOUND),
      );
    });
  });

  describe('updateUser', () => {
    const updateUserDto = {
      name: 'Updated Name',
    };

    it('should update user successfully', async () => {
      mockPrismaService.read.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.write.user.update.mockResolvedValue({
        ...mockUser,
        ...updateUserDto,
      });

      await repository.updateUser('1', updateUserDto);

      expect(mockPrismaService.write.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateUserDto,
      });
    });

    it('should throw NotFoundException when user does not exist', async () => {
      mockPrismaService.read.user.findUnique.mockResolvedValue(null);

      await expect(repository.updateUser('1', updateUserDto)).rejects.toThrow(
        new NotFoundException(EErrors.USER_NOT_FOUND),
      );
    });
  });

  describe('resetPassword', () => {
    it('should reset password successfully', async () => {
      mockPrismaService.read.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.write.user.update.mockResolvedValue(mockUser);

      await repository.resetPassword('1', 'newHashedPassword');

      expect(mockPrismaService.write.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { password: 'newHashedPassword' },
      });
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      mockPrismaService.read.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.delete.user.delete.mockResolvedValue(mockUser);

      await repository.deleteUser('1');

      expect(mockPrismaService.delete.user.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException when user does not exist', async () => {
      mockPrismaService.read.user.findUnique.mockResolvedValue(null);

      await expect(repository.deleteUser('1')).rejects.toThrow(
        new NotFoundException(EErrors.USER_NOT_FOUND),
      );
    });
  });
});
