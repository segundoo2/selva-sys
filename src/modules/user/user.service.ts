import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.dto';
import { EErrors } from 'src/enum/errors.enum';

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
    const user = this.userRepository.findUserById(id);

    if (!user) {
      throw new NotFoundException(EErrors.USER_NOT_FOUND);
    }

    return this.userRepository.updateUser(id, updateUserDto);
  }
}
