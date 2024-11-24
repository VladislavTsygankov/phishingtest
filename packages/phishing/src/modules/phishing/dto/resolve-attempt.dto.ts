import { IsString } from "class-validator";

export class ResolveAttemptDto {
  @IsString()
  id?: string;
}
