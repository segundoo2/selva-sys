import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async createUser(createUserDto: CreateUserDto) {
    await this.prismaClient.user.create({
      data: {
        levelAccess: createUserDto.levelAccess,
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
      },
    });
  }
}
