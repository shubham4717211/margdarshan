import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from './user/user.schema';
import { ScholarshipSchema } from './scholarship/scholarship.schema';
import { AuthModule } from './auth/auth.module';
import { config } from 'dotenv';
import { ScholarshipModule } from './scholarship/scholarship.module.ts';
import { UserModule } from './user/user.module';
config();
@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.DATABASE_URL || 'mongodb://localhost:27017/margdarshan',
    ),

    // MongooseModule.forFeature([
    //   { name: 'Scholarship', schema: ScholarshipSchema },
    // ]),
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: '30d' }, // Token expires after 30 days
    // }),
    AuthModule,
    ScholarshipModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
