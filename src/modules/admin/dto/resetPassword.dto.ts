import { IsString, MinLength } from 'class-validator';
import { EErrors } from 'src/enum/errors.enum';

export class ResetPasswordDto {
  @IsString({ message: EErrors.EMPTY_FIELD })
  @MinLength(6, { message: EErrors.PASSWORD_LENGTH })
  password: string;
}
