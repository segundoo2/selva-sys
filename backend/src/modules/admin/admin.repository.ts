import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.dto';
import { EErrors } from '../../enum/errors.enum';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const existingEmail = await this.prisma.reader.users.findUnique({
        where: { email: createUserDto.email },
      });
      
      if (existingEmail) {
        throw new ConflictException(EErrors.EMAIL_EXIST);
      }
      return await this.prisma.write.users.create({
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
      console.log("IHIIIII", error);
      throw new InternalServerErrorException(EErrors.INTERNAL_ERROR);
    }
  }

  async findAllUsers(where) {
    return this.prisma.reader.users.findMany({
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
    const user = await this.prisma.reader.users.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(EErrors.USER_NOT_FOUND);
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    await this.verifyUserExist(id);

    return this.prisma.write.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async resetPassword(id: string, passwordHashed: string) {
    await this.verifyUserExist(id);

    return this.prisma.write.users.update({
      where: { id },
      data: { password: passwordHashed },
    });
  }

  async deleteUser(id: string) {
    await this.verifyUserExist(id);

    return await this.prisma.delete.users.delete({
      where: { id },
    });
  }
}
