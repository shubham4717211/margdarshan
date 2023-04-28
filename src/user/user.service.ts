import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Scholarship } from 'src/scholarship/scholarship.schema';
import { User } from './user.schema';


@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Scholarship') private readonly scholarshipModel: Model<Scholarship>,
  ) {}

  async getUserScholarships(userId: string): Promise<Scholarship[]> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }

    const scholarships = await this.scholarshipModel
      .find({
        state: user.state,
        level_of_study: user.level_of_study,
        fieldOfStudy: user.field_of_study,
        // $or: [
        //   { gender: user.gender },
        //   { gender: 'all' },
        // ],
        gender: user.gender 
      })
      .exec();

    console.log(user, scholarships)
    return scholarships;
  }
}
