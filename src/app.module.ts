import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://shubham:123@cluster0.x8dbuw7.mongodb.net/test',
    ),
    JwtModule.register({
      secret: 'your-secret-key', // Replace with your own secret key
      signOptions: { expiresIn: '30d' }, // Token expires after 30 days
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
