import { IsEmail, IsIn, IsNotEmpty, MinLength } from 'class-validator';
import { ECrudValidation } from 'src/enum/crud-validation.enum';

export class CreateUserDto {
  @IsIn(['admin', 'diretor', 'secretario', 'tesoureiro', 'instrutor'], {
    message: ECrudValidation.ROLE_INVALID,
  })
  role: 'admin' | 'diretor' | 'secretario' | 'tesoureiro' | 'instrutor';

  @IsNotEmpty({ message: ECrudValidation.EMPTY_FIELD })
  name: string;

  @IsEmail({}, { message: ECrudValidation.EMAIL_INVALID })
  email: string;

  @MinLength(6, { message: ECrudValidation.PASSWORD_LENGTH })
  password: string;
}
