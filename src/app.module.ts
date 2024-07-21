import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { JwtModule } from "@nestjs/jwt";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE, HttpAdapterHost } from "@nestjs/core";
import { LoggingInterceptor } from "../utils/interceptors/logging.interceptor";
import { ZodValidationPipe } from "nestjs-zod";
import { PrismaModule } from "../utils/prisma/prisma.module";
import { PrismaService } from "../utils/prisma/prisma.service";
import { PrismaClientExceptionFilter } from "nestjs-prisma";
import { env } from "../utils/env";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: `${1000 * 3600 * 72}s` }
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10
    }]),
  ],
  controllers: [AppController],
  providers: [PrismaService, AppService,
    {
      provide: APP_FILTER,
      useFactory: ({ httpAdapter }: HttpAdapterHost) => {
        return new PrismaClientExceptionFilter(httpAdapter);
      },
      inject: [HttpAdapterHost]
    },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }]
})
export class AppModule {
}
