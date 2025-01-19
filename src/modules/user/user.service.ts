import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      return await this.userRepository.createUser(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  async findAllUsers(email: string) {
    const where = email
      ? { email: { contains: email, mode: 'insensitive' } }
      : {};
    return await this.userRepository.findAllUsers(where);
  }
}
