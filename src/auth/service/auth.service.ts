import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/Users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user) {
      const checkPassword = bcrypt.compare(pass, user.password);
      if (checkPassword) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }
}
