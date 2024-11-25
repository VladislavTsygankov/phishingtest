import { Body, Controller, Post } from "@nestjs/common";
import { PhishingSimulationService } from "./phishing-simulation.service";
import { PhishingSimulationDto } from "./dto/phishing-simulation.dto";

@Controller("phishing")
export class PhishingSimulationController {
  constructor(private readonly phishingService: PhishingSimulationService) {}

  @Post("send")
  sendEmail(@Body() phishignDto: PhishingSimulationDto) {
    return this.phishingService.sendPhishingEmail(phishignDto);
  }
}
