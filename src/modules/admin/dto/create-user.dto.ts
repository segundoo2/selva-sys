import { IsEmail, IsIn, IsNotEmpty, MinLength } from 'class-validator';
import { EErrors } from 'src/enum/errors.enum';

export class CreateUserDto {
  @IsIn(['admin', 'diretor', 'secretario', 'tesoureiro', 'instrutor'], {
    message: EErrors.ROLE_INVALID,
  })
  role: 'admin' | 'diretor' | 'secretario' | 'tesoureiro' | 'instrutor';

  @IsNotEmpty({ message: EErrors.EMPTY_FIELD })
  name: string;

  @IsEmail({}, { message: EErrors.EMAIL_INVALID })
  email: string;

  @MinLength(6, { message: EErrors.PASSWORD_LENGTH })
  password: string;
}
