import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EErrors } from 'src/enum/errors.enum';
import { UpdateUserDto } from './dto/update.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const existingEmail = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });

      if (existingEmail) {
        throw new ConflictException(EErrors.EMAIL_EXIST);
      }

      return this.prisma.user.create({
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

  async findAllUsers(where) {
    return this.prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async verifyUserExist(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(EErrors.USER_NOT_FOUND);
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    await this.verifyUserExist(id);

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async resetPassword(id: string, passwordHashed: string) {
    await this.verifyUserExist(id);

    return this.prisma.user.update({
      where: { id },
      data: { password: passwordHashed },
    });
  }

  async deleteUser(id: string) {
    await this.verifyUserExist(id);

    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
