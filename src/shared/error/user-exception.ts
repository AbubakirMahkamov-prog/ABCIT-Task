import { HttpException, HttpStatus } from "@nestjs/common";
import { ERROR_PREFIX, ErrorCodes } from "./error-code";



export class UserNotFoundException extends HttpException{
  constructor() {
    super({
        code: `${ERROR_PREFIX}${ErrorCodes.NOT_FOUND}`, description: `USER NOT FOUND`},
      HttpStatus.NOT_FOUND);
  }
}
