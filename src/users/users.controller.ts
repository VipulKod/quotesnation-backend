import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UsersService } from './services/Users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  async findOne(@Param('userId') userId: string): Promise<Partial<User>> {
    console.log(userId);
    return this.usersService.findOne(userId);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  async createUser(@Req() request: any): Promise<User> {
    return this.usersService.create(request?.body);
  }

  @Post('login')
  async loginUser(@Req() request: any): Promise<User> {
    return this.usersService.login(
      request?.body?.email,
      request?.body?.password,
    );
  }
}
