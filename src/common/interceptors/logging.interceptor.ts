import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const { method, url, body } = req; // Extract method, url, and body from the request
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
