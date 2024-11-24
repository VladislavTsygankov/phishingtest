import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { PhishingService } from "./phishing.service";
import { JwtAuthGuard } from "src/guards/jwt.guard";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PhishingAttempt } from "./phishing.model";
import { CreateAttemptDto } from "./dto/create-attempt.dto";
import { ResolveAttemptDto } from "./dto/resolve-attempt.dto";

@Controller("phishing")
export class PhishingController {
  constructor(private readonly phishingService: PhishingService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: "Getting all attempts" })
  @ApiResponse({ status: 200, type: PhishingAttempt })
  @UseGuards(JwtAuthGuard)
  @Get("")
  getAllAttempts() {
    return this.phishingService.getAllAttempts();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Send new attempt" })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post("send")
  sendPhishingAttempt(@Body() dto: CreateAttemptDto) {
    return this.phishingService.sendAttempt(dto);
  }

  @ApiOperation({ summary: "Send new attempt" })
  @ApiResponse({ status: 200, type: PhishingAttempt })
  @Get("resolve")
  resolveAttempt(@Query() { id }: ResolveAttemptDto) {
    return this.phishingService.resolveAttempt(id);
  }
}
