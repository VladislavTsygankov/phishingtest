import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class MailService {
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

  async sendPhishingEmail(to: string, phishingLink: string) {
    const mailOptions = {
      from: "Phishing simulate app",
      to,
      subject: "Phishing test",
      html: `<p>Click <a href="${phishingLink}">here</a></p>`, // HTML версия письма (опционально)
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);

      return info;
    } catch (error) {
      return null;
    }
  }
}
