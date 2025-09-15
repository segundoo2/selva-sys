import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { EErrors } from '@/enum/errors.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João da Silva',
    required: false,
  })
  @IsOptional()
  @IsString({ message: EErrors.EMPTY_FIELD })
  @MinLength(2, { message: EErrors.NAME_INVALID })
  name?: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao.silva@exemplo.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: EErrors.EMAIL_INVALID })
  @IsString({ message: EErrors.EMPTY_FIELD })
  email?: string;

  @ApiProperty({
    description: 'Senha do usuário (mínimo 6 caracteres)',
    example: 'nova_senha123',
    required: false,
    minLength: 6,
  })
  @IsOptional()
  @IsString({ message: EErrors.EMPTY_FIELD })
  @MinLength(6, { message: EErrors.PASSWORD_LENGTH })
  password?: string;

  @ApiProperty({
    description: 'Função do usuário no sistema',
    enum: ['admin', 'diretor', 'secretario', 'tesoureiro', 'instrutor'],
    example: 'secretario',
    required: false,
  })
  @IsOptional()
  @IsString({ message: EErrors.EMPTY_FIELD })
  @MinLength(2, { message: EErrors.ROLE_INVALID })
  role?: string;
}
