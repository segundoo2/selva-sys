import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { PassportModule } from '@nestjs/passport';
import { CsrfGuard } from './guards/csrf.guard';
import { ConfigModule } from '@nestjs/config';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, RolesGuard, CsrfGuard, AuthRepository],
  exports: [AuthService, CsrfGuard, RolesGuard, JwtModule],
})
export class AuthModule {}
