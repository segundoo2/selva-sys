import { IsEmail, MinLength } from 'class-validator';
import { EErrors } from '@/enum/errors.enum';

export class AuthDto {
  @IsEmail({}, { message: EErrors.EMAIL_INVALID })
  email: string;

  @MinLength(6, { message: EErrors.PASSWORD_LENGTH })
  password: string;
}
