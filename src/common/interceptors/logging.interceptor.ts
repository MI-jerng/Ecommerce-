import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpReq = context.switchToHttp().getRequest<Request>();
    const gqlReq = !httpReq?.method
      ? GqlExecutionContext.create(context).getContext()?.req
      : undefined;
    const req = httpReq?.method ? httpReq : gqlReq;
    const method = req?.method ?? 'GRAPHQL';
    const url = req?.url ?? '/graphql';
    const body = req?.body;
    const start = Date.now();

    // Log event payload for POST /orders
    if (method === 'POST' && url.startsWith('/orders')) {
      console.log('Event payload:', body);
    }

    return next.handle().pipe(
      tap(() => {
        const ms = Date.now() - start;
        console.log(`${method} ${url} - ${ms}ms`);
      }),
    );
  }
}
