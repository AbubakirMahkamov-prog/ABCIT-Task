import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from "./auth/auth.module";
import { PublicationModule } from "./publications/publication.module";

@Module({
  imports: [AuthModule, PublicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
