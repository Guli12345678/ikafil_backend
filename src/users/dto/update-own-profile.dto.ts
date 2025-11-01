import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MinLength } from "class-validator";

export class UpdateOwnProfileDto {
  @ApiPropertyOptional({ description: "Full name" })
  @IsOptional()
  @IsString()
  @MinLength(2)
  full_name?: string;

  @ApiPropertyOptional({ description: "Phone number" })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: "Username" })
  @IsOptional()
  @IsString()
  @MinLength(3)
  username?: string;
}
