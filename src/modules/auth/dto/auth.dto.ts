import { IsEmail, MinLength } from 'class-validator';
import { ECrudValidation } from 'src/enum/crud-validation.enum';

export class AuthDto {
  @IsEmail({}, { message: ECrudValidation.EMAIL_INVALID })
  email: string;

  @MinLength(6, { message: ECrudValidation.PASSWORD_LENGTH })
  password: string;
}
