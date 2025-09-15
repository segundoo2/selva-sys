import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { UnauthorizedException } from '@nestjs/common';
import { EErrors } from '../../enum/errors.enum';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;

  const mockUser = {
    id: '1',
    email: 'test@example.com',
    password: bcrypt.hashSync('password123', 10),
    role: 'admin',
    name: 'Test User',
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mock_token'),
    verify: jest.fn().mockResolvedValue(true),
    verifyAsync: jest.fn().mockResolvedValue({
      email: mockUser.email,
      sub: mockUser.id,
      role: mockUser.role,
    }),
  };

  const mockAuthRepository = {
    findByEmail: jest.fn(),
  };

  const mockResponse = {
    cookie: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: AuthRepository,
          useValue: mockAuthRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user without password when credentials are valid', async () => {
      mockAuthRepository.findByEmail.mockResolvedValue(mockUser);

      const result = await service.validateUser(mockUser.email, 'password123');
      const expectedResult = {
        id: mockUser.id,
        email: mockUser.email,
        role: mockUser.role,
        name: mockUser.name,
      };

      expect(result).toEqual(expectedResult);
    });

    it('should return null when user is not found', async () => {
      mockAuthRepository.findByEmail.mockResolvedValue(null);

      const result = await service.validateUser(
        'wrong@email.com',
        'password123',
      );

      expect(result).toBeNull();
    });

    it('should return null when password is invalid', async () => {
      mockAuthRepository.findByEmail.mockResolvedValue(mockUser);

      const result = await service.validateUser(
        mockUser.email,
        'wrongpassword',
      );

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    const loginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should successfully login and return tokens', async () => {
      const validateUserSpy = jest.spyOn(service, 'validateUser');
      validateUserSpy.mockResolvedValue({ ...mockUser, password: undefined });

      await service.login(loginDto, mockResponse);

      expect(validateUserSpy).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password,
      );
      expect(mockResponse.cookie).toHaveBeenCalledTimes(3);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Login feito com sucesso!',
      });
    });

    it('should throw UnauthorizedException when credentials are invalid', async () => {
      const validateUserSpy = jest.spyOn(service, 'validateUser');
      validateUserSpy.mockResolvedValue(null);

      await expect(service.login(loginDto, mockResponse)).rejects.toThrow(
        new UnauthorizedException(EErrors.INVALID_CREDENTIALS),
      );
    });
  });

  describe('refreshAccessToken', () => {
    const mockRequest = {
      headers: {
        'x-csrf-token': 'valid_csrf_token',
      },
      cookies: {
        refresh_token: 'valid_refresh_token',
        csrf_token: 'valid_csrf_token',
      },
    };

    it('should successfully refresh tokens', async () => {
      await service.refreshAccessToken(mockRequest, mockResponse);

      expect(mockResponse.cookie).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should throw UnauthorizedException when refresh token is missing', async () => {
      const invalidRequest = {
        headers: { 'x-csrf-token': 'valid_csrf_token' },
        cookies: { csrf_token: 'valid_csrf_token' },
      };

      await expect(
        service.refreshAccessToken(invalidRequest, mockResponse),
      ).rejects.toThrow(EErrors.REFRESH_TOKEN_INVALID);
    });

    it('should throw UnauthorizedException when CSRF token is invalid', async () => {
      const invalidRequest = {
        headers: { 'x-csrf-token': 'invalid_csrf_token' },
        cookies: {
          refresh_token: 'valid_refresh_token',
          csrf_token: 'valid_csrf_token',
        },
      };

      await expect(
        service.refreshAccessToken(invalidRequest, mockResponse),
      ).rejects.toThrow(EErrors.CSRF_INVALID);
    });
  });
});
