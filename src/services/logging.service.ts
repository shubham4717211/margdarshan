import * as winston from 'winston';
import { ILoggingService } from './logging.interface';

export class WinstonLoggingService implements ILoggingService{
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
      ],
    });
  }

  logError(message: string, stackTrace: string) {
    this.logger.error(message, { stackTrace });
  }
}
