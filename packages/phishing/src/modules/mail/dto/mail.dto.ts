import { IsEmail, IsString } from "class-validator";

export class MailDto {
  @IsString()
  @IsEmail()
  readonly to: string;

  @IsString()
  readonly attemptId: string;
}
