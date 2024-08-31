import { HttpException } from '@nestjs/common';

export class ErrorLog extends HttpException {
  statusCode: number;
  timestamp: string;
  api: string;
  label: string;
  tags: any;
  request: { body: any; query: any; params: any };
  user: any;

  constructor(
    response: any | Record<string, any>,
    status: number,
    requestUrl: string,
    request,
    user,
  ) {
    super(response, status);
    const { ...user_data } = user || {};
    this.statusCode = status;
    this.timestamp = new Date().toISOString();
    this.api = requestUrl;
    this.label = 'CHECK_MOCK_INT_BACKEND';
    this.tags = {
      db_id: user?.db_id,
      type: this.errorGroup(this.statusCode),
      api: this.api,
      user_agent: request.headers['user-agent'],
      client: request.headers['sec-ch-ua-platform'],
      client_browser: request.headers['sec-ch-ua'],
      referer: request.headers['referer'],
      ip_address:
        request.headers['x-forwarded-for'] || request.connection.remoteAddress,
    };
    this.request = {
      body: JSON.stringify(request.body),
      params: JSON.stringify(request.params),
      query: JSON.stringify(request.query),
    };
    this.user = user_data;
  }

  errorGroup(status: any) {
    if (status >= 300 && status < 400) {
      return 'REDIRECTION';
    }
    if (status >= 400 && status < 500) {
      return 'CLIENT_ERROR';
    }
    if (status >= 500 && status < 600) {
      return 'SERVER_ERROR';
    }
  }
}
