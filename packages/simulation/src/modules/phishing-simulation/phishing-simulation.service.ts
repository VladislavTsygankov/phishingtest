import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { PhishingSimulationDto } from "./dto/phishing-simulation.dto";

@Injectable()
export class PhishingSimulationService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
  }

  async sendPhishingEmail({ attemptId, to }: PhishingSimulationDto) {
    const phishingLink = `${process.env.RESOLVE_API_URL}/phishing/resolve?id=${attemptId}`;
    const mailOptions = {
      from: "Phishing simulate app",
      to,
      subject: "Phishing test",
      html: `<p>Click <a href="${phishingLink}">here</a></p>`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);

      return info;
    } catch (error) {
      return null;
    }
  }
}
