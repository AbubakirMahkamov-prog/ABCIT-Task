import { HttpException } from '@nestjs/common';
export declare class ErrorLog extends HttpException {
    statusCode: number;
    timestamp: string;
    api: string;
    label: string;
    tags: any;
    request: {
        body: any;
        query: any;
        params: any;
    };
    user: any;
    constructor(response: any | Record<string, any>, status: number, requestUrl: string, request: any, user: any);
    errorGroup(status: any): "REDIRECTION" | "CLIENT_ERROR" | "SERVER_ERROR";
}
