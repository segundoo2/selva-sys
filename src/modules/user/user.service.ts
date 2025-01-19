import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const newUserCreate = await this.userRepository.createUser(createUserDto);
      return newUserCreate;
    } catch (error) {
      throw error;
    }
  }
}
