import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/user.dto';

@Injectable()
export class UserDataService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
