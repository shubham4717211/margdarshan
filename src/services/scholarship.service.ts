import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Scholarship } from '../schemas/scholarship.schema';
import { ScholarshipDataService } from 'src/data/scholarship.data.service';
import { ScholarshipUserInterface } from 'src/interface/scholarship.interface';

@Injectable()
export class ScholarshipService {
  constructor(
    @InjectModel('Scholarship')
    private readonly scholarshipModel: Model<Scholarship>,
    private readonly scholarshipDataService: ScholarshipDataService
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

  async getUserScholarships(user: ScholarshipUserInterface): Promise<Scholarship[]> {
    return this.scholarshipDataService.findScholarships(user);
  }
}
