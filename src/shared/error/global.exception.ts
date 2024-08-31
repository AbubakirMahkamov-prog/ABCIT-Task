import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_PREFIX, ErrorCodes } from './error-code';

export class YouHaveNotPermissionException extends HttpException {
  constructor() {
    super(
      {
        code: `${ERROR_PREFIX}${ErrorCodes.YOU_HAVE_NOT_PERMISSION}`,
        description: `YOU_HAVE_NOT_PERMISSION`,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
