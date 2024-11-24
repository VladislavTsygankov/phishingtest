import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

export type PhishingAttemptDocument = PhishingAttempt & Document;

@Schema()
export class PhishingAttempt {
  @ApiProperty({ example: "user@gmail.com", description: "Email" })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ description: "User password" })
  @Prop({ required: true })
  status: "pending" | "resolved";
}

export const PhishingAttemptSchema = SchemaFactory.createForClass(PhishingAttempt);
