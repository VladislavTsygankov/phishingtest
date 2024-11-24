import { Module } from "@nestjs/common";
import { PhishingService } from "./phishing.service";
import { PhishingController } from "./phishing.controller";
import { MongooseModule } from "@nestjs/mongoose";

import { MailModule } from "../mail/mail.module";
import { PhishingAttempt, PhishingAttemptSchema } from "./phishing.model";

@Module({
  providers: [PhishingService],
  controllers: [PhishingController],
  imports: [
    MongooseModule.forFeature([{ name: PhishingAttempt.name, schema: PhishingAttemptSchema }]),
    MailModule,
  ],
})
export class PhishingModule {}
