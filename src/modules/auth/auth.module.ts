import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { PrismaClient } from '@prisma/client';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { csrfGuard } from './guards/csrf.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '15m' },
    }),
    UserModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, csrfGuard, UserRepository, PrismaClient],
  exports: [AuthService, csrfGuard],
})
export class AuthModule {}
