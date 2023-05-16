import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UserSchema } from '../schemas/user.schema';
import { RouterModule } from '@nestjs/core';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    ]),
    RouterModule.register([
      {
        path: 'user',
        module: UserController,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
