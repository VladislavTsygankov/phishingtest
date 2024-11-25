import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { PhishingSimulationModule } from "./modules/phishing-simulation/phishing-simulation.module";

@Module({
  imports: [PhishingSimulationModule, ConfigModule.forRoot({ envFilePath: ".env" })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
