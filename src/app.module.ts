import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from './user/user.schema';
import { ScholarshipSchema } from './scholarship/scholarship.schema';
import { AuthModule } from './auth/auth.module';
import { config } from 'dotenv';
config();
@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.DATABASE_URL as string,
    ),
    MongooseModule.forFeature([
      { name: 'Scholarship', schema: ScholarshipSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' }, // Token expires after 30 days
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
