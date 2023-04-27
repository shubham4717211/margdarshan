import { Controller, Get } from '@nestjs/common';
import { ScholarshipService } from './scholarship.service';

@Controller('scholarship')
export class ScholarshipController {
  constructor(private readonly scholarshipService: ScholarshipService) {}

  @Get('/slugs')
  async getScholarshipSlugs() {
    return this.scholarshipService.getScholarshipSlugs();
  }
}
