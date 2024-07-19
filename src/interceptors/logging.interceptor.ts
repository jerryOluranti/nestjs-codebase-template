import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from "@nestjs/common";
import { catchError, Observable } from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger();

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();

        const now = new Date(Date.now());
        this.logger.log(`IN: ${req.method}-${req.path}: [${req.ip}]`);

        return next
          .handle()
          .pipe(
            tap(() => {
                const after = new Date(Date.now());
                this.logger.log(`OUT: ${res.statusCode}: [${after.getMilliseconds() - now.getMilliseconds()} ms]`)
            }),
            catchError((error, caught) => {
                this.logger.error(error);
                throw error;
            }),
          );
    }
}
