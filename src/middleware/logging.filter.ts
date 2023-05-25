import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { ILoggingService } from 'src/services/logging.interface';

@Catch()
export class LoggingFilter {
  constructor(private readonly loggingService: ILoggingService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = 500;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }

    // Log the error in a file
    this.loggingService.logError(message, exception.stack);

    // Send the error response to the client if headers are not sent
    // if (!response.headersSent) {
      response.status(status).json({
        statusCode: status,
        message,
      });
    // }
  }
}
