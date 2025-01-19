import { IsEmail, IsIn, IsNotEmpty, MinLength } from 'class-validator';
import { ECrud } from 'src/enum/crud.enum';

export class CreateUserDto {
  @IsIn(['admin', 'diretor', 'secretario', 'tesoureiro', 'instrutor'], {
    message: ECrud.ROLE_INVALID,
  })
  role: 'admin' | 'diretor' | 'secretario' | 'tesoureiro' | 'instrutor';

  @IsNotEmpty({ message: ECrud.EMPTY_FIELD })
  name: string;

  @IsEmail({}, { message: ECrud.EMAIL_INVALID })
  email: string;

  @MinLength(6, { message: ECrud.PASSWORD_LENGHT })
  password: string;
}
