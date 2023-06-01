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
    // const matchStage = {
    //   state: user.state,
    //   level_of_study: user.level_of_study,
    //   fieldOfStudy: user.field_of_study,
    //   gender: user.gender === 'female' ? user.gender : 'all',
    // };

    const matchStage = {
      $or: [
        { state: user.state },
        { level_of_study: user.level_of_study },
        { fieldOfStudy: user.field_of_study },
        { gender: user.gender === 'female' ? user.gender : 'all' },
      ],
    };
  
    return this.scholarshipModel.aggregate([
      { $match: matchStage },
      { $sample: { size: 8 } }, // Get a random sample of 8 scholarships
      { $limit: 8 } // Ensure a minimum of 8 scholarships are returned
    ]).exec();
  }
}
