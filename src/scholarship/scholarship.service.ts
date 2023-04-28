import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Scholarship } from './scholarship.schema';

@Injectable()
export class ScholarshipService {
  constructor(
    @InjectModel('Scholarship')
    private readonly scholarshipModel: Model<Scholarship>,
  ) {}

  async getScholarshipSlugs(): Promise<string[]> {
    const scholarships = await this.scholarshipModel
      .find({}, { slug: 1, _id: 0 })
      .lean();
    return scholarships.map(({ slug }) => slug);
  }

  async create(scholarship: Scholarship): Promise<Scholarship> {
    const createdScholarship = new this.scholarshipModel(scholarship);
    return createdScholarship.save();
  }
}
