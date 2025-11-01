import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, IsOptional } from "class-validator";
import { Expose } from "class-transformer";

@ValidatorConstraint({ name: "PasswordsMatchNoToken", async: false })
class PasswordsMatchNoToken implements ValidatorConstraintInterface {
  validate(_: unknown, args: ValidationArguments) {
    const obj: any = args.object;
    return obj.newPassword === obj.confirmNewPassword;
  }
  defaultMessage() {
    return "Passwords do not match";
  }
}

export class ResetPasswordNoTokenDto {
  @ApiProperty({ minLength: 6 })
  @Expose({ name: "new_password" })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;

  @ApiProperty({ minLength: 6 })
  @Expose({ name: "confirm_new_password" })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Validate(PasswordsMatchNoToken)
  confirmNewPassword: string;

  // Optional field accepted to satisfy whitelist when frontend sends it; not used server-side
  @ApiPropertyOptional({ description: "Previous password (ignored)" })
  @Expose({ name: "old_password" })
  @IsOptional()
  @IsString()
  old_password?: string;
}
