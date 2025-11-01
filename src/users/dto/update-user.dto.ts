import { PartialType, OmitType, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsEmail, IsBoolean } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, [
    "password",
    "confirmPassword",
    "email",
    "isActive",
  ] as const)
) {
  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
