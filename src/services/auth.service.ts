import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from 'src/dto/user.dto';
import { CookieOptions, Response  } from 'express';
import { UserDataService } from 'src/data/user/user.data.service';

@Injectable()
export class AuthService {
  constructor(private readonly userDataService: UserDataService) {}

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
