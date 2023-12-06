import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Account = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (data === 'access_token') return request.accessToken;
    return request.account;
  },
);
