import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserSchema, User } from 'src/dto/user.schema';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async signup(userData: Partial<User>): Promise<any> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createdUser = new this.userModel({
      ...userData,
      password: hashedPassword,
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
    const isPasswordValid = await bcrypt.compare(password, user.password);
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
    };
  }

  generateToken(payload: any, expiresIn: string): string {
    return jwt.sign(payload, 'your-secret-key', { expiresIn });
  }

  verifyToken(token: string): any {
    return jwt.verify(token, 'your-secret-key');
  }
}
