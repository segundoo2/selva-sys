import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ECrudValidation } from 'src/enum/crud-validation.enum';
import { EErrors } from 'src/enum/errors.enum';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const existingEmail = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });

      if (existingEmail) {
        throw new ConflictException(ECrudValidation.EMAIL_EXIST);
      }

      return await this.prisma.user.create({
        data: {
          role: createUserDto.role,
          name: createUserDto.name,
          email: createUserDto.email,
          password: createUserDto.password,
        },
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException(EErrors.INTERNAL_ERROR);
    }
  }
}
