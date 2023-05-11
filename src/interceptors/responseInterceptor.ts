import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        // Modify the response data structure
        const statusCode = context.switchToHttp().getResponse().statusCode;
        if (statusCode >= 400) {
          // Handle error response
          return {
            success: false,
            statusCode,
            error: data.message || 'Internal Server Error',
          };
        }
        
        // Handle success response
        return {
          success: true,
          statusCode,
          data,
        };
      }),
    );
  }
}
