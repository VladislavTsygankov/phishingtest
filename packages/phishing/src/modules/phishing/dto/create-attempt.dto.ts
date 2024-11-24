import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateAttemptDto {
  @ApiProperty({ example: "example@mail.com", description: "Email" })
  @IsString({ message: "Must be a string" })
  @IsEmail({}, { message: "Invalid email" })
  readonly email: string;
}
