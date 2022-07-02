import {
  Body,
  Param,
  Controller,
  Patch,
  Post,
  Get,
  ValidationPipe,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Post()
  create(@Body(ValidationPipe) createUser: CreateUserDto) {
    return this.usersService.create(createUser);
  }

  @Patch(':username')
  updateUser(
    @Param('username') username: string,
    @Body('newname') newname: string,
  ) {
    return this.usersService.updateUser(username, newname);
  }

  @Delete(':username')
  deleteUser(@Param('username') username: string) {
    return this.usersService.deleteUser(username);
  }
}
