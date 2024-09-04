import { Module } from "@nestjs/common";
import { KnexService } from "./providers/knex.service";
import { JwtModule } from "@nestjs/jwt";
import { MailerService } from "./providers/mailer.service";
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleService } from '../shared/providers/schedule.service'
@Module({
  imports: [
    JwtModule.register({}),
    ScheduleModule.forRoot(),
  ],
  providers: [
    KnexService,
    MailerService,
    ScheduleService
  ],
  exports: [KnexService, JwtModule, MailerService],
})
export class SharedModule {}
