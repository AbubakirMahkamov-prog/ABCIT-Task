import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpServer,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request } from 'express';
import { ErrorLog } from './error-log';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(applicationRef: HttpServer) {
    super(applicationRef);
  }

  // @InjectPinoLogger() private readonly logger = new Logger(AllExceptionsFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    if (typeof exception === 'string') {
      exception = exception ? JSON.parse(exception) : {};
    }
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const isHttpException = exception instanceof HttpException;
    const exceptionData: any = isHttpException
      ? exception?.getResponse()
      : exception;
    // eslint-disable-next-line no-console
    const ClientRequest: any = ctx.getRequest<Request>();
    console.log(
      'exception',
      ClientRequest.url,
      ClientRequest.body,
      exceptionData,
    );
    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorLog = new ErrorLog(
      exceptionData,
      status,
      ClientRequest.url,
      ClientRequest,
      ClientRequest.user,
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { tags, ...error } = errorLog;

    return response.status(status).json(error);
  }
}
