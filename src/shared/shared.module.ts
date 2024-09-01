import { Module } from "@nestjs/common";
import { KnexService } from "./providers/knex.service";
import { JwtModule } from "@nestjs/jwt";
import { MailerService } from "./providers/mailer.service";
import { AuthModule } from "../auth/auth.module";
console.log(AuthModule)
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
