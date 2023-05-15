import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { LoggingFilter } from './middleware/logging.filter';
import { WinstonLoggingService } from './services/logging.service';
import { ResponseInterceptor } from './interceptors/responseInterceptor';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // Set up CORS configuration
   app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const loggingService = new WinstonLoggingService();
  // app.useGlobalFilters(new LoggingFilter(loggingService));
  app.useGlobalInterceptors(new ResponseInterceptor())

  if (!process.env.PORT) {
    throw new Error('PORT not defined in .env file');
  }
  await app.listen(process.env.PORT);
  console.log('Margdarshan successfully started on 9000');
}
bootstrap();
