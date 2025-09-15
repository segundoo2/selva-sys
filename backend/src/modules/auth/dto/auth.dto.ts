import { IsEmail, MinLength } from 'class-validator';
import { EErrors } from '@/enum/errors.enum';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@exemplo.com',
  })
  @IsEmail({}, { message: EErrors.EMAIL_INVALID })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário (mínimo 6 caracteres)',
    example: 'senha123',
  })
  @MinLength(6, { message: EErrors.PASSWORD_LENGTH })
  password: string;
}
