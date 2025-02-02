import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.dto';
import * as bcrypt from 'bcrypt';
import { ResetPasswordDto } from './dto/resetPassword.dto';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
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
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      return this.userRepository.updateUser(id, updateUserDto);
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(id: string, resetPasswordDto: ResetPasswordDto) {
    try {
      const passwordHashed = await bcrypt.hash(resetPasswordDto.password, 10);
      return this.userRepository.resetPassword(id, passwordHashed);
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
