import { Body, Controller, Get, HttpException, Param, UseGuards, Post, Patch,Req, Redirect } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { AuthDto, RegisterDto } from "./dto";
import { successMessage, sendConfirm } from '../shared/constants/message-types'

import { AuthorizationGuard } from '../shared/guards/authorization.guard'
import { RouteName } from '../shared/guards/specialRoute';

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    type: AuthDto,
    description: "login",
  })
  @Post("login")
  async loginUser(@Body() data: AuthDto) {
      return await this.authService.loginUser(data);
  }

  @ApiBody({
    type: RegisterDto,
    description: "registration",
  })
  @Post("register")
  async registerUser(@Body() data: RegisterDto) {
    await this.authService.registerUser(data);
    return {
      status: 200,
      message: sendConfirm,
      data: []
    }
  }

  @Get("confirm-user-email/:id")
  async confirmUserEmail(@Param("id") id: string){
    await this.authService.confirmUserEmail(id);
    return successMessage;
  }
  @ApiBody({
    type: RegisterDto,
    description: "Edit user",
  })
  @UseGuards(AuthorizationGuard)
  @RouteName('/edit-user')
  @Patch('/edit-user')
  async editUser(@Body() data: RegisterDto, @Req() request: Request) {
    return this.authService.editUser(data, request);
  }
}
