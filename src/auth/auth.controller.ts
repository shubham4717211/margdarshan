import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('gender') gender: string,
    @Body('dateOfBirth') dateOfBirth: Date,
    @Body('country') country: string,
    @Body('state') state: string,
    @Body('city') city: string,
  ) {
    const user = await this.authService.signup({
      firstName,
      lastName,
      email,
      password,
      gender,
      dateOfBirth,
      country,
      state,
      city,
    });
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
