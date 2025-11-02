import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MinLength, IsBoolean, IsEnum } from "class-validator";
import { UserRole } from "@prisma/client";

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

  @ApiPropertyOptional({ description: "User bio" })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ enum: UserRole })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
