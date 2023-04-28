import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me/:userId')
  async getUserScholarships(@Param('userId') userId: string) {
    return this.userService.getUserScholarships(userId);
  }
}
