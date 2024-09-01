import { Body, Controller, Get, HttpException, Param, Post, Redirect } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { AuthDto, RegisterDto } from "./dto";
import { successMessage } from '../shared/constants/message-types'


@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    type: AuthDto,
    description: "login",
  })
  @Post("login")
  async loginUser(@Body() data: any) {
      return await this.authService.loginUser(data);
  }

  @ApiBody({
    type: RegisterDto,
    description: "registration",
  })
  @Post("register")
  async registerUser(@Body() data: any) {
    return this.authService.registerUser(data);
  }

  @Get("confirm-user-email/:id")
  async confirmUserEmail(@Param("id") id: string){
    await this.authService.confirmUserEmail(id);
    return successMessage;
  }
}
