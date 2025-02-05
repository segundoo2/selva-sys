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
import { CsrfGuard } from '../auth/guards/csrf.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/role.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  @Roles('admin')
  @UseGuards(CsrfGuard, RolesGuard)
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.createUser(createUserDto);
      return 'Usuário criado com sucesso!';
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @Roles('admin')
  @UseGuards(CsrfGuard, RolesGuard)
  async findAllUsers(@Query('email') email?: string) {
    return await this.userService.findAllUsers(email);
  }

  @Put('/:id')
  @Roles('admin')
  @UseGuards(CsrfGuard, RolesGuard)
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

  @Patch('/:id')
  @Roles('admin')
  @UseGuards(CsrfGuard, RolesGuard)
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

  @Delete('/:id')
  @Roles('admin')
  @UseGuards(CsrfGuard, RolesGuard)
  async deleteUser(@Param('id') id: string) {
    try {
      await this.userService.deleteUser(id);
      return 'Usuário deletado com sucesso!';
    } catch (error) {
      throw error;
    }
  }
}
