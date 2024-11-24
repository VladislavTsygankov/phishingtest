import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({ example: "user@gmail.com", description: "Email" })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ description: "User password" })
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
