import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EErrors } from '../../../enum/errors.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Função do usuário no sistema',
    enum: ['admin', 'diretor', 'secretario', 'tesoureiro', 'instrutor'],
    example: 'secretario',
  })
  @IsIn(['admin', 'diretor', 'secretario', 'tesoureiro', 'instrutor'], {
    message: EErrors.ROLE_INVALID,
  })
  role: 'admin' | 'diretor' | 'secretario' | 'tesoureiro' | 'instrutor';

  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João da Silva',
  })
  @IsNotEmpty({ message: EErrors.EMPTY_FIELD })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao.silva@exemplo.com',
  })
  @IsEmail({}, { message: EErrors.EMAIL_INVALID })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário (entre 6 e 20 caracteres)',
    example: 'senha123',
    minLength: 6,
    maxLength: 20,
  })
  @MinLength(6, { message: EErrors.PASSWORD_LENGTH })
  @MaxLength(20, { message: EErrors.PASSWORD_LENGTH })
  password: string;
}
