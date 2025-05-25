import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { EErrors } from '@/enum/errors.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: EErrors.EMPTY_FIELD })
  @MinLength(2, { message: EErrors.NAME_INVALID })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: EErrors.EMAIL_INVALID })
  @IsString({ message: EErrors.EMPTY_FIELD })
  email?: string;

  @IsOptional()
  @IsString({ message: EErrors.EMPTY_FIELD })
  @MinLength(6, { message: EErrors.PASSWORD_LENGTH })
  password?: string;

  @IsOptional()
  @IsString({ message: EErrors.EMPTY_FIELD })
  @MinLength(2, { message: EErrors.ROLE_INVALID })
  role?: string;
}
