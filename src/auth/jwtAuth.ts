import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/dto/user.schema';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    const access_token = this.generateToken(payload, '30m');
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
