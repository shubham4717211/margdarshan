import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from './user/user.schema';
import { ScholarshipSchema } from './scholarship/scholarship.schema';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://shubham:123@cluster0.x8dbuw7.mongodb.net/test',
    ),
    MongooseModule.forFeature([
      { name: 'Scholarship', schema: ScholarshipSchema }, // add the ScholarshipSchema here
    ]),
    JwtModule.register({
      secret: 'your-secret-key', // Replace with your own secret key
      signOptions: { expiresIn: '30d' }, // Token expires after 30 days
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
