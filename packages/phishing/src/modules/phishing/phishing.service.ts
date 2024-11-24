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
    const candidateAttempt = await this.phishingAttemptRepository.findOne({
      email: attemptDto.email,
    });

    if (candidateAttempt) {
      throw new BadRequestException("Phishing attempt already exists");
    }

    const attempt = await this.phishingAttemptRepository.create({
      email: attemptDto.email,
      status: "pending",
    });

    const phishingLink = `${process.env.API_URL}/phishing/resolve?id=${attempt._id}`;

    await this.mailService.sendPhishingEmail(attempt.email, phishingLink);

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
