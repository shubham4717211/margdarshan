import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { request } from 'https';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { GetUser } from '../decorators/user.decorator';
import { OnBoardDto } from 'src/dto/on-board.dto';
import { ScholarshipUserInterface } from 'src/interface/scholarship.interface';


@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('on-board')
  @UseGuards(JwtAuthGuard)
  async signup(@Body() onBoardDto: OnBoardDto, @GetUser() user: ScholarshipUserInterface) {
    const userData = await this.userService.onBoard(user.id,onBoardDto);
    return userData;
  }
}
