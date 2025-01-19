import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ECrudValidation } from 'src/enum/crud-validation.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: ECrudValidation.EMPTY_FIELD })
  @MinLength(2, { message: ECrudValidation.NAME_INVALID })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: ECrudValidation.EMAIL_INVALID })
  @IsString({ message: ECrudValidation.EMPTY_FIELD })
  email?: string;

  @IsOptional()
  @IsString({ message: ECrudValidation.EMPTY_FIELD })
  @MinLength(6, { message: ECrudValidation.PASSWORD_LENGTH })
  password?: string;

  @IsOptional()
  @IsString({ message: ECrudValidation.EMPTY_FIELD })
  role?: string;
}
