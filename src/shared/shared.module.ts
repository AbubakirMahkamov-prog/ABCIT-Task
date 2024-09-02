import { Module } from "@nestjs/common";
import { KnexService } from "./providers/knex.service";
import { JwtModule } from "@nestjs/jwt";
import { MailerService } from "./providers/mailer.service";

@Module({
  imports: [
    JwtModule.register({}),
  ],
  providers: [
    KnexService,
    MailerService
  ],
  exports: [KnexService, JwtModule, MailerService],
})
export class SharedModule {}
