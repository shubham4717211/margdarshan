import axios from 'axios';

export class OpenAIApi {
  private readonly apiKey: string;
  private readonly apiUrl: string;
  private sessionId: string;
  private conversation: string[];
  private chunkSize: number;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
    this.sessionId = '';
    this.conversation = [];
    this.chunkSize = 3; // Change the chunk size as desired
  }

  async startSession(): Promise<void> {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/sessions',
        {
          start_prompt: '',
          model: 'davinci-codex',
          enable_chat_mode: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      this.sessionId = response.data.id;
      this.conversation = [];
    } catch (error) {
      throw new Error('Failed to start the OpenAI session.');
    }
  }

  async sendMessage(message: string): Promise<string> {
    if (this.conversation.length === 0 || this.conversation.length % this.chunkSize === 0) {
      // Start a new chunk by sending a system message
      this.conversation.push(`Chunk ${this.conversation.length / this.chunkSize + 1}`);
    }

    this.conversation.push(message);

    try {
      const response = await axios.post(
        `${this.apiUrl}/${this.sessionId}/completions`,
        {
          messages: this.conversation.map((msg) => ({ role: 'system', content: msg })),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      const reply = response.data.choices[0].message.content;
      this.conversation.push(reply);

      return reply;
    } catch (error) {
      throw new Error('Failed to send message to OpenAI API.');
    }
  }

  async generateEmbeddings(chunks: string[]): Promise<number[][]> {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          messages: chunks.map((chunk) => ({ role: 'system', content: chunk })),
          model: 'davinci-codex',
          max_tokens: 0,
          return_prompt: true,
          return_sequences: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      const embeddings = response.data.choices[0].message['embeddings'];

      return embeddings;
    } catch (error) {
      throw new Error('Failed to generate embeddings.');
    }
  }

  async getEmbeddings(chunk: string): Promise<number[]> {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          messages: [{ role: 'system', content: chunk }],
          model: 'davinci-codex',
          max_tokens: 0,
          return_prompt: true,
          return_sequences: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      const embeddings = response.data.choices[0].message['embeddings'];

      return embeddings;
    } catch (error) {
      throw new Error('Failed to get embeddings.');
    }
  }

  async endSession(): Promise<void> {
    try {
      await axios.delete(`${this.apiUrl}/${this.sessionId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
      });

      this.sessionId = '';
      this.conversation = [];
    } catch (error) {
      throw new Error('Failed to end the OpenAI session.');
    }
  }
}
