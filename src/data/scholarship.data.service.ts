import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Scholarship } from '../schemas/scholarship.schema';
import { ScholarshipUserInterface } from 'src/interface/scholarship.interface';

@Injectable()
export class ScholarshipDataService {
  constructor(
    @InjectModel('Scholarship') private readonly scholarshipModel: Model<Scholarship>,
  ) {}

  async findScholarships(user:ScholarshipUserInterface): Promise<Scholarship[]> {
    return this.scholarshipModel.aggregate([
      {
        $match: {
          state: user.state,
          level_of_study: user.level_of_study,
          fieldOfStudy: user.field_of_study,
          gender: { $in: [user.gender, 'all'] },
        },
      },
      // Additional aggregation stages if needed
    ]).exec();
  }
}
