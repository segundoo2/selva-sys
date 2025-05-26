import { IsString, MinLength } from 'class-validator';
import { EErrors } from '@/enum/errors.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Nova senha do usuário (mínimo 6 caracteres)',
    example: 'nova_senha123',
    minLength: 6,
  })
  @IsString({ message: EErrors.EMPTY_FIELD })
  @MinLength(6, { message: EErrors.PASSWORD_LENGTH })
  password: string;
}
