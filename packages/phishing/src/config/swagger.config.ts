import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const swagger = (app: INestApplication<any>) => {
  const config = new DocumentBuilder()
    .setTitle("Phishing test")
    .setDescription("RestAPI")
    .setVersion("1.0.0")
    .addTag("VladislavTsygankov")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);
};
