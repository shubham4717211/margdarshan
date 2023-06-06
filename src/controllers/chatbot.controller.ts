import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from 'src/services/chatbot.service';


@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  async handleMessage(@Body() message: string) {
    const response = await this.chatbotService.processMessage(message);
    return { response };
  }
}
