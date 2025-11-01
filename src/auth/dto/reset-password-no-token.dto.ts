import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

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
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;

  @ApiProperty({ minLength: 6 })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Validate(PasswordsMatchNoToken)
  confirmNewPassword: string;
}
