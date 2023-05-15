import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ResponseInterceptor } from './interceptors/responseInterceptor';

@Controller()
// @UseInterceptors(ResponseInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
