import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { swagger } from "./config";
import { ValidationPipe } from "./pipes";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGINS,
    methods: "*",
  });

  swagger(app);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
