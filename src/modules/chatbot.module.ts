// chatbot.module.ts
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatbotController } from 'src/controllers/chatbot.controller';
import { ChatbotService } from 'src/services/chatbot.service';
import { OpenAIService } from 'src/services/openai.service';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    RouterModule.register([
      {
        path: 'chatbot',
        module: ChatbotController,
      },
    ]),
  ],
  controllers: [ChatbotController],
  providers: [ChatbotService, OpenAIService],
})
export class ChatbotModule {}
