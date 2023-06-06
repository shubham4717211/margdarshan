// chatbot.service.ts
import { Injectable } from '@nestjs/common';
import { OpenAIService } from './openai.service';

@Injectable()
export class ChatbotService {
  constructor(private readonly openAIService: OpenAIService) {}

  async processMessage(message: string): Promise<string> {
    // Process the message using OpenAI API
    const response = await this.openAIService.sendMessage(message);

    // Perform additional processing if needed

    return response;
  }
}
