import * as winston from 'winston';

export class LoggingService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
      ],
    });
  }

  logError(message: string, stackTrace: string) {
    this.logger.error(message, { stackTrace });
  }
}
