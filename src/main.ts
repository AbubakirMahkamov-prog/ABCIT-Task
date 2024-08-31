import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import * as expressBasicAuth from 'express-basic-auth';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { AllExceptionsFilter } from './shared/error/all-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const port: number = parseInt(process.env.HTTP_PORT) || 3001;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    cors: true,
  });
  const swaggerDocName = 'ABCIT-Task-api-documentation';
  app.setGlobalPrefix('api');
  app.use(
    ['/' + swaggerDocName],
    expressBasicAuth({
      challenge: true,
      users: {
        abcAdmin: '123',
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Api documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        name: 'authorization',
        type: 'apiKey',
        in: 'header',
      },
      'authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerDocName, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.disable('etag');
  app.disable('x-powered-by');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
    }),
  );
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.enableShutdownHooks();
  await app.init();

  await app.listen(port, () => {
    // env();
    console.log('jxd server listening on port: ', port);
    console.log(
      'Swagger running at: ',
      `\x1b[33m http://localhost:${port}/${swaggerDocName}\x1b[39m`,
    );
  });
}
bootstrap();
