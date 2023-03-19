import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthMiddleware } from 'src/auth/middleware/auth.middleware';
import { User } from '../interfaces/user.interface';
import { UsersService } from '../services/Users.service';

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
}
