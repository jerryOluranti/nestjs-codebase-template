import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { ZodFilter } from "../utils/zod";
import { env } from "../utils/env";

const expressListRoutes = require("express-list-routes");

async function bootstrap() {
  initializeApp(
      {
        credential: applicationDefault()
      }
  );
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
  });
  app.useGlobalFilters(new ZodFilter());
  await app.listen(process.env.PORT, "localhost");

  // const server = app.getHttpServer();
  // const router = server._events.request._router;
  expressListRoutes(app.getHttpServer()._events.request._router);
}

bootstrap();
