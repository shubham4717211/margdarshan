import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { LoggingFilter } from './logger/logging.filter';
import { LoggingService } from './logger/logging.service';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // Set up CORS configuration
   app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const loggingService = new LoggingService();
  app.useGlobalFilters(new LoggingFilter(loggingService));

  if (!process.env.PORT) {
    throw new Error('PORT not defined in .env file');
  }
  await app.listen(process.env.PORT);
  console.log('Margdarshan successfully started on 9000');
}
bootstrap();
