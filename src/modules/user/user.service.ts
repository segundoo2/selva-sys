import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { Crud } from 'src/enum/crud.enum';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    if (!createUserDto) {
      throw new HttpException(Crud.REQUIRED_FIELDS, HttpStatus.BAD_REQUEST);
    }

    await this.userRepository.createUser(createUserDto);
  }
}
