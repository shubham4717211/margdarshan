import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from 'src/dto/user.dto';
import { Response } from 'express';
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
}
