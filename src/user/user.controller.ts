import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { request } from 'https';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from './user.guards';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me/:userId')
  @UseGuards(JwtAuthGuard)
  async getUserScholarships(@GetUser() user: { userId: string }) {
    return this.userService.getUserScholarships(user.userId);
  }
}
