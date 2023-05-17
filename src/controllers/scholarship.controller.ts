import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ScholarshipService } from '../services/scholarship.service';
import { Scholarship } from '../data/scholarship/scholarship.schema';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { GetUser } from 'src/guards/user.guard';
import { ScholarshipUserInterface } from 'src/interface/scholarship.interface';

@Controller()
export class ScholarshipController {
  constructor(private readonly scholarshipService: ScholarshipService) {}

  @Get('scholarship')
  // @UseGuards(JwtAuthGuard)
  async getUserScholarships(@GetUser() user: ScholarshipUserInterface ) {
    return this.scholarshipService.getUserScholarships(user);
  }
  
  @Get('/slugs')
  async getScholarshipSlugs() {
    return this.scholarshipService.getScholarshipSlugs();
  }

  @Post()
  async create(@Body() scholarship: Scholarship): Promise<Scholarship> {
    return this.scholarshipService.create(scholarship);
  }
}
