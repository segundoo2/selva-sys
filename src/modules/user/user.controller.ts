import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { csrfGuard } from '../auth/guards/csrf.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(csrfGuard)
  @Post('/create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.createUser(createUserDto);
      return 'Usuário criado com sucesso!';
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(csrfGuard)
  @Get()
  async findAllUsers(@Query('email') email?: string) {
    return await this.userService.findAllUsers(email);
  }

  @UseGuards(csrfGuard)
  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      await this.userService.updateUser(id, updateUserDto);
      return 'Usuário atualizado com sucesso!';
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(csrfGuard)
  @Patch('/:id')
  async resetPassword(
    @Param('id') id: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    try {
      await this.userService.resetPassword(id, resetPasswordDto);
      return 'Senha atualizada com sucesso!';
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(csrfGuard)
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    try {
      await this.userService.deleteUser(id);
      return 'Usuário deletado com sucesso!';
    } catch (error) {
      throw error;
    }
  }
}
