import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { JwtModule } from '@nestjs/jwt';
;
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserSchema } from 'src/schemas/user.schema';
import { UserDataService } from 'src/data/user.data.service';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' }, // Token expires after 30 days
    }),
    RouterModule.register([
      {
        path: 'auth',
        module: AuthController,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, UserDataService],  
})
export class AuthModule {}
