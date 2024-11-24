import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "example@mail.com", description: "email" })
  @IsString({ message: "Must be a string" })
  @IsEmail({}, { message: "Invalid email" })
  readonly email: string;

  @ApiProperty({ description: "Password" })
  @IsString({ message: "Must be a string" })
  readonly password: string;
}
