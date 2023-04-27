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
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
          throw new Error('JWT secret not defined in .env file');
        }
        const decoded = jwt.verify(token, jwtSecret);
        request.user = decoded;
        return true;
      } catch (err) {
        throw new UnauthorizedException('Invalid token');
      }
    }
  }
  