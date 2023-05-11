import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScholarshipController } from '../controllers/scholarship.controller';
import { ScholarshipSchema } from '../data/scholarship/scholarship.schema';
import { ScholarshipService } from '../services/scholarship.service';
import { ScholarshipDataService } from 'src/data/scholarship/scholarship.data.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Scholarship', schema: ScholarshipSchema },
    ]),
  ],
  controllers: [ScholarshipController],
  providers: [ScholarshipService, ScholarshipDataService],
})
export class ScholarshipModule {}
