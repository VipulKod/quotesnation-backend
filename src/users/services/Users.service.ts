import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { pick } from 'lodash';
import { Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    // Extract only desired properties from each user object
    const usersWithSelectedProps = users.map(({ username, email, userId }) => ({
      username,
      email,
      userId,
    }));
    // Return new array of user objects with selected properties
    return usersWithSelectedProps;
  }

  async findOne(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid Object ID');
    }
    const existingUser = this.userModel.findById(id).exec();
    if (!existingUser) {
      throw new Error('User not found');
    }
    const { username, email, userId } = pick(existingUser, [
      'username',
      'email',
      'userId',
    ]);
    return {
      username,
      email,
      userId,
    };
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (existingUser) {
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const id = uuidv4(); // generate a unique ID
    const createdUser = new this.userModel({
      userId: id,
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
    });
    createdUser.save();
    const { username, email, userId } = pick(createdUser, [
      'username',
      'email',
      'userId',
    ]);

    // Return extracted properties
    return { username, email, userId };
  }

  async update(id: string, user: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.userModel.findByIdAndRemove(id).exec();
  }

  async login(inputEmail: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ email: inputEmail });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { username, email, userId } = pick(user, [
      'username',
      'email',
      'userId',
    ]);
    return { username, email, userId };
  }
}
