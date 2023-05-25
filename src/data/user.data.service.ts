import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/user.dto';
import { OnBoardDto } from 'src/dto/on-board.dto';

@Injectable()
export class UserDataService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
  
  async updateUser(userId: string, onBoardDto: OnBoardDto): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(userId, onBoardDto, { new: true }).exec();
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async getUserById(_id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id }).select('-password').exec();
    if(!user){
      throw new NotFoundException('User not found');
    }
    return user
  }
}
