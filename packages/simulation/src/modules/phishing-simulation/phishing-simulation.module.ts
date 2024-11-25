import { Module } from "@nestjs/common";
import { PhishingSimulationController } from "./phishing-simulation.controller";
import { PhishingSimulationService } from "./phishing-simulation.service";

@Module({
  controllers: [PhishingSimulationController],
  providers: [PhishingSimulationService],
})
export class PhishingSimulationModule {}
