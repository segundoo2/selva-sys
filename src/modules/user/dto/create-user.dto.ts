import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { ECrud } from 'src/enum/crud.enum';

export class CreateUserDto {
  @IsNotEmpty({ message: ECrud.ACCESS_LEVEL })
  @IsString({ message: ECrud.EMPTY_FIELD })
  @IsIn(['admin', 'diretor', 'secretario', 'tesoureiro', 'instrutor'], {
    message: ECrud.ROLE_INVALID,
  })
  role: 'admin' | 'diretor' | 'secretario' | 'tesoureiro' | 'instrutor';

  @IsNotEmpty({ message: ECrud.EMPTY_FIELD })
  @IsString({ message: ECrud.EMPTY_FIELD })
  name: string;

  @IsEmail({}, { message: ECrud.EMAIL_INVALID })
  @IsNotEmpty({ message: ECrud.EMAIL_REQUIRED })
  @IsString({ message: ECrud.EMPTY_FIELD })
  email: string;

  @IsNotEmpty({ message: ECrud.PASSWORD_REQUIRED })
  @IsString({ message: ECrud.EMPTY_FIELD })
  @MinLength(6, { message: ECrud.PASSWORD_LENGHT })
  password: string;
}
