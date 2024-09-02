import { HttpException, HttpStatus } from "@nestjs/common";
import { ERROR_PREFIX, ErrorCodes } from "./error-code";



export class UserNotFoundException extends HttpException{
  constructor() {
    super({
        code: `${ERROR_PREFIX}${ErrorCodes.NOT_FOUND}`, description: `USER NOT FOUND`},
      HttpStatus.NOT_FOUND);
  }
}

export class RecordBelongsToOthers extends HttpException {
  constructor() {
    super({
        code: `${ERROR_PREFIX}${ErrorCodes.YOU_HAVE_NOT_PERMISSION}`, description: `RECORD BELONGS TO OTHERS`},
      HttpStatus.FORBIDDEN);
  }
}