import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserSchema, User } from 'src/user/user.schema';
import { SignupDto } from 'src/dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async signup(signupDto: SignupDto): Promise<any> {
    const {
      fullName,
      // lastName,
      email,
      password,
      gender,
      // dateOfBirth,
      pin,
      state,
      city,
      // education,
      level_of_study,
      field_of_study,
    } = signupDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({
      fullName,
      // lastName,
      email,
      password: hashedPassword,
      gender,
      // dateOfBirth: new Date(dateOfBirth),
      pin,
      state,
      city,
      // education,
      level_of_study,
      field_of_study,
    });
    const savedUser = await createdUser.save();

    const payload = {
      userId: savedUser._id,
      email: savedUser.email,
    };
    const access_token = this.generateToken(payload, '1h');
    const refresh_token = this.generateToken(payload, '30d');
    return {
      access_token,
      refresh_token,
    };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // console.log('user:', user);
    // console.log('password:', user.password.toString());

    const isPasswordValid = await bcrypt.compare(password, user.password.toString());
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      userId: user._id,
      email: user.email,
    };
    const access_token = this.generateToken(payload, '1h');
    const refresh_token = this.generateToken(payload, '30d');
    return {
      access_token,
      refresh_token,
      payload,
    };
  }

  generateToken(payload: any, expiresIn: string): string {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT secret not defined in .env file');
    }
    return jwt.sign(payload, jwtSecret, { expiresIn });
  }

  // verifyToken(token: string): any {
  // const jwtSecret = process.env.JWT_SECRET;
  // if (!jwtSecret) {
  //   throw new Error('JWT secret not defined in .env file');
  // }
  //   return jwt.verify(token, jwtSecret);
  // }
}
