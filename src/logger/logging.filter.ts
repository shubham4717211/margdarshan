import { Catch, ArgumentsHost } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class LoggingFilter extends BaseExceptionFilter {
  constructor(private readonly loggingService: LoggingService) {
    super();
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status = exception.getStatus();
    const message = exception.message || 'Internal server error';

    // Log the error in a file
    this.loggingService.logError(exception.message, exception.stack);

    super.catch(exception, host);

    // Send the error response to the client
    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
