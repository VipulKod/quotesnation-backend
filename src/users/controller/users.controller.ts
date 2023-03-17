import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthMiddleware } from 'src/auth/middleware/auth.middleware';
import { cors } from 'src/middleware/cors.middleware';
import { User } from '../interfaces/user.interface';
import { UsersService } from '../services/Users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(cors)
  @Get(':userId')
  async findOne(@Param('userId') userId: string): Promise<Partial<User>> {
    console.log(userId);
    return this.usersService.findOne(userId);
  }

  @UseInterceptors(cors)
  @UseGuards(AuthMiddleware)
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseInterceptors(cors)
  @Post()
  async createUser(@Req() request: any): Promise<User> {
    return this.usersService.create(request?.body);
  }
}
