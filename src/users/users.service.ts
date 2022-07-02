import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  // Userモデルのインジェクト
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  users: CreateUserDto[] = [];

  async create(user: CreateUserDto) {
    const createdUser = new this.userModel({
      username: user.username,
      password: user.password,
    });
    return await createdUser.save();
  }
  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(username: string) {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new NotFoundException('ユーザーが見つかりません！');
    }
    return user;
  }

  async updateUser(username: string, newname: string) {
    const targetUser = await this.findOne(username);
    targetUser.username = newname;
    return await targetUser.save();
  }

  async deleteUser(username: string) {
    const user = await this.findOne(username);
    user.deleteOne({ username });
    return user;
  }
}
