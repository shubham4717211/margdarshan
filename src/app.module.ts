import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from './modules/auth.module';
import { config } from 'dotenv';
import { ScholarshipModule } from './modules/scholarship.module.ts';
import { UserModule } from './modules/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './interceptors/responseInterceptor';
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
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
