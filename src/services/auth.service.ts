import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from 'src/dto/user.dto';
import { CookieOptions, Response  } from 'express';
import { UserDataService } from 'src/data/user.data.service';
import { MailService } from './mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userDataService: UserDataService,
    private readonly mailService: MailService,
    ) {}

  async signup(signupDto: CreateUserDto, ): Promise<{ access_token: string, payload: { userId: string, email: string } }> {
    

    signupDto.password = await bcrypt.hash(signupDto.password, 10);
    const createdUser = await this.userDataService.createUser(signupDto)

    const payload = {
      userId: createdUser._id,
      email: createdUser.email,
    };
    // const access_token = this.generateToken(payload, '1h', res);
    const access_token = this.generateToken(payload, '1h');
    return {
      access_token:access_token,
      payload
    };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string; payload: { userId: string; email: string } }> {
    const user = await this.userDataService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      userId: user._id.toString(),
      email: user.email,
    };
    const access_token = this.generateToken(payload, '1h');
    return {
      access_token: access_token,
      payload,
    };
  }

  async sendForgotPasswordEmail(email: string): Promise<void> {
    const user = await this.userDataService.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const token = this.generateToken({ userId: user._id.toString(), email }, '1h');
    await this.mailService.sendForgotPasswordEmail(email, token);
  }

  async resetPassword(userId: string ,newPassword: string): Promise<void> {
    const user = await this.userDataService.getUserById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userDataService.updateUserPassword(userId, hashedPassword);
  }

  generateToken(payload: any, expiresIn: string): string {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT secret not defined in .env file');
    }
  
    const token = jwt.sign(payload, jwtSecret, { expiresIn });
  
    const cookieOptions: CookieOptions = {
      maxAge: parseInt(expiresIn) * 1000, // Convert expiresIn to milliseconds
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    };
  
    // Set the cookie with the token
    // res.cookie('access_token', token, cookieOptions);
  
    return token;
  }

  // verifyToken(token: string): any {
  // const jwtSecret = process.env.JWT_SECRET;
  // if (!jwtSecret) {
  //   throw new Error('JWT secret not defined in .env file');
  // }
  //   return jwt.verify(token, jwtSecret);
  // }
}
