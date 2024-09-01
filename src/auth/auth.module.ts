import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { SharedModule } from "../shared/shared.module";
import { AuthRepo } from "./auth.repo";

@Module({
  providers: [AuthService, AuthRepo],
  controllers: [AuthController],
  imports: [SharedModule],
})
export class AuthModule {}
