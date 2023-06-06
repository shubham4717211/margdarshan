// openai.service.ts
import { Injectable } from '@nestjs/common';
import { OpenAIApi } from './openai.api';

@Injectable()
export class OpenAIService {
  private openAIApi: OpenAIApi;

  constructor() {
    // Initialize the OpenAI API client with your API key
    this.openAIApi = new OpenAIApi('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');
  }

  async sendMessage(message: string): Promise<string> {
    // Call the OpenAI API to generate a response
    const response = await this.openAIApi.sendMessage(message);
  
    // Check if the response is a valid object
    if (typeof response === 'object' && response !== null) {
      const data = response as { data: { choices: { text: string }[] } };
  
      // Extract the reply from the API response
      const choices = data.data.choices;
      if (choices && choices.length > 0) {
        const reply = choices[0].text.trim();
        return reply;
      }
    }
  
    // Return an empty string if the response is not valid or no reply is available
    return '';
  }
  
  
  
}
