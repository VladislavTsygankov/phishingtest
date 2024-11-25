import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { MailDto } from "./dto/mail.dto";

@Injectable()
export class MailService {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.SIMULATION_API_URL,
    });
  }

  async sendPhishingEmail(mailDto: MailDto) {
    return await this.httpClient.post("/phishing/send", mailDto);
  }
}
