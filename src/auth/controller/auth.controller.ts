import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/services/Users.service';
import { LocalStrategy } from '../strategy/local/local';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @UseGuards(LocalStrategy)
  @Post('login')
  async loginUser(@Req() request: any): Promise<User> {
    const payload = {
      username: request.body.username,
      sub: request.body.userId,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return this.usersService.login(
      request?.body?.username,
      request?.body?.password,
      `Bearer ${token}`,
    );
  }
}
