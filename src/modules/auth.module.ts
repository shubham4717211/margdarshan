import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { JwtModule } from '@nestjs/jwt';
;
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserSchema } from 'src/data/user/user.schema';
import { UserDataService } from 'src/data/user/user.data.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' }, // Token expires after 30 days
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, UserDataService],  
})
export class AuthModule {}