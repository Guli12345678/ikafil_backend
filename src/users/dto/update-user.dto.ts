import { PartialType, OmitType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, [
    "password",
    "confirmPassword",
    "email",
    "isActive",
  ] as const)
) {
  email?: string;
  isActive?: boolean;
}
