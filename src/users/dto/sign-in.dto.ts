import { IsNotEmpty, MinLength, IsString } from "class-validator";

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
