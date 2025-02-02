import { IsString, MinLength } from 'class-validator';
import { ECrudValidation } from 'src/enum/crud-validation.enum';

export class ResetPasswordDto {
  @IsString({ message: ECrudValidation.EMPTY_FIELD })
  @MinLength(6, { message: ECrudValidation.PASSWORD_LENGTH })
  password: string;
}
