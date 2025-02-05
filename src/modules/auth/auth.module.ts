import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { PrismaClient } from '@prisma/client';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { CsrfGuard } from './guards/csrf.guard';
import { ConfigModule } from '@nestjs/config';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '15m' },
    }),
    forwardRef(() => UserModule),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, RolesGuard, CsrfGuard, UserRepository, PrismaClient],
  exports: [AuthService, CsrfGuard, RolesGuard, JwtModule],
})
export class AuthModule {}
