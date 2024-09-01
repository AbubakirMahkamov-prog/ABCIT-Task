import { ArgumentsHost, HttpServer } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
export declare class AllExceptionsFilter extends BaseExceptionFilter {
    constructor(applicationRef: HttpServer);
    catch(exception: any, host: ArgumentsHost): any;
}
