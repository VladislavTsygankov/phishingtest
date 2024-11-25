import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateAttemptDto } from "./dto/create-attempt.dto";
import { InjectModel } from "@nestjs/mongoose";
import { PhishingAttempt, PhishingAttemptDocument } from "./phishing.model";
import { Model } from "mongoose";
import { MailService } from "../mail/mail.service";

@Injectable()
export class PhishingService {
  constructor(
    @InjectModel(PhishingAttempt.name)
    private phishingAttemptRepository: Model<PhishingAttemptDocument>,
    private readonly mailService: MailService,
  ) {}

  async getAllAttempts() {
    return await this.phishingAttemptRepository.find();
  }

  async sendAttempt(attemptDto: CreateAttemptDto) {
    const attempt = await this.phishingAttemptRepository.create({
      email: attemptDto.email,
      status: "pending",
    });

    await this.mailService.sendPhishingEmail({
      to: attempt.email,
      attemptId: attempt.id,
    });

    return attempt;
  }

  async resolveAttempt(id: string) {
    return await this.phishingAttemptRepository.findByIdAndUpdate(
      id,
      {
        status: "resolved",
      },
      { new: true },
    );
  }
}
