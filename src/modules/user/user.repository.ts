import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.prismaClient.user.create({
      data: {
        role: createUserDto.role,
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
      },
    });
  }
}
