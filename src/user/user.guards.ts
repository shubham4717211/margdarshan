import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const jwtService = new JwtService({});
    const accessToken = req.headers.authorization.replace('Bearer ', '');
    const user = jwtService.decode(accessToken);
    // console.log(user)
    return user;
  },
);
