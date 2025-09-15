import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenGuard } from './guards/access-token.guard';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn(),
    refreshAccessToken: jest.fn(),
  };

  const mockJwtService = {
    verify: jest.fn().mockResolvedValue(true),
  };

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        AccessTokenGuard,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    const loginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should call authService.login with correct parameters', async () => {
      await controller.login(loginDto, mockResponse);

      expect(authService.login).toHaveBeenCalledWith(loginDto, mockResponse);
    });
  });

  describe('validateSession', () => {
    it('should return status 200 when session is valid', async () => {
      await controller.validateSession(mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
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

    it('should call authService.refreshAccessToken with correct parameters', async () => {
      await controller.refreshAccessToken(mockRequest as any, mockResponse);

      expect(authService.refreshAccessToken).toHaveBeenCalledWith(
        mockRequest,
        mockResponse,
      );
    });
  });
});
