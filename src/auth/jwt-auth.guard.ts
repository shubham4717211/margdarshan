import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import * as jwt from 'jsonwebtoken';
  
  @Injectable()
  export class JwtAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      try {
        const token = request.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'your-secret-key');
        request.user = decoded;
        return true;
      } catch (err) {
        throw new UnauthorizedException('Invalid token');
      }
    }
  }
  