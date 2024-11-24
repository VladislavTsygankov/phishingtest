import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./modules/users/users.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { PhishingModule } from "./modules/phishing/phishing.module";
import { MailModule } from "./modules/mail/mail.module";
import { JwtAuthGuard } from "./guards/jwt.guard";

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ envFilePath: ".env" }),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      dbName: process.env.MONGODB_DATABASE_NAME,
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASSWORD,
    }),
    AuthModule,
    PhishingModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuard],
})
export class AppModule {}
