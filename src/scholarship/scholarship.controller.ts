import { Body, Controller, Get, Post } from '@nestjs/common';
import { ScholarshipService } from './scholarship.service';
import { Scholarship } from './scholarship.schema';

@Controller('scholarship')
export class ScholarshipController {
  constructor(private readonly scholarshipService: ScholarshipService) {}

  @Get('/slugs')
  async getScholarshipSlugs() {
    return this.scholarshipService.getScholarshipSlugs();
  }

  @Post()
  async create(@Body() scholarship: Scholarship): Promise<Scholarship> {
    return this.scholarshipService.create(scholarship);
  }
}
