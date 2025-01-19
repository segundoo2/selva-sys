import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.createUser(createUserDto);
      return 'Usuário criado com sucesso!';
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAllUsers(@Query('email') email?: string) {
    return await this.userService.findAllUsers(email);
  }

  @Patch('/updatedata/:id')
}
