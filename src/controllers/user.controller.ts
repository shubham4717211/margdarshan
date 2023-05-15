import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { request } from 'https';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { GetUser } from '../guards/user.guard';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

}
