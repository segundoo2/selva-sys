import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      return this.userRepository.createUser(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  async findAllUsers(email: string) {
    const where = email
      ? { email: { contains: email, mode: 'insensitive' } }
      : {};
    return this.userRepository.findAllUsers(where);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      return this.userRepository.updateUser(id, updateUserDto);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string) {
    try {
      return this.userRepository.deleteUser(id);
    } catch (error) {
      throw error;
    }
  }
}
