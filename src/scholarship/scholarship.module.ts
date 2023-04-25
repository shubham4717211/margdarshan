import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScholarshipSchema } from 'src/scholarship/scholarship.schema';
// import { ScholarshipSchema, Scholarship } from './scholarship.schema';
// import { ScholarshipsController } from './scholarships.controller';
// import { ScholarshipsService } from './scholarships.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Scholarship', schema: ScholarshipSchema }])],
//   controllers: [ScholarshipsController],
//   providers: [ScholarshipsService, { provide: 'SCHOLARSHIP_MODEL', useFactory: (scholarshipModel) => scholarshipModel, inject: ['SCHOLARSHIP_CONNECTION'] }],
})
export class ScholarshipsModule {}
