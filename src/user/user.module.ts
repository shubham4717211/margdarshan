import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ScholarshipSchema } from 'src/scholarship/scholarship.schema';
import { UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Scholarship', schema: ScholarshipSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
