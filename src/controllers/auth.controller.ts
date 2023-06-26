import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from 'src/dto/user.dto';
import { Response } from 'express';
import { GetUser } from 'src/decorators/user.decorator';
import { ScholarshipUserInterface } from 'src/interface/scholarship.interface';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: CreateUserDto, ) {
    const user = await this.authService.signup(signupDto);
    return user;
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const tokens = await this.authService.login(email, password);
    return tokens;
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    await this.authService.sendForgotPasswordEmail(email);
    return { message: 'Password reset email sent' };
  }

  @Post('reset-password')
  @UseGuards(JwtAuthGuard)
  async resetPassword(
    @GetUser() user: ScholarshipUserInterface,
    @Body('password') password: string,
  ) {
    await this.authService.resetPassword(user.userId,password);
    return { message: 'Password reset successful' };
  }
}
