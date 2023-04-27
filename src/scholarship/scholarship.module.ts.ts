import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScholarshipController } from './scholarship.controller';
import { ScholarshipSchema } from './scholarship.schema';
import { ScholarshipService } from './scholarship.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Scholarship', schema: ScholarshipSchema }]),
  ],
  controllers: [ScholarshipController],
  providers: [ScholarshipService],
})
export class ScholarshipModule {}
