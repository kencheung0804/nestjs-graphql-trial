import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class ShareSecretGuard extends AuthGuard('header') {
  // implements CanActivate
  getRequest(context: ExecutionContext): any {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
  // canActivate(context: ExecutionContext) {
  //   const ctx = GqlExecutionContext.create(context);
  //   ctx.getContext().req.header.authorization;
  //   return true;
  // }
}
