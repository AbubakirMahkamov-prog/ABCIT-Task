import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {

  @ApiProperty()
  email?: string;

  @ApiProperty()
  full_name?: string;

  @ApiProperty()
  password?: string;
}