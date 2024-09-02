import { Module } from "@nestjs/common";
import { PublicationService } from "./publication.service";
import { PublicationController } from "./publication.controller";
import { SharedModule } from "../shared/shared.module";
import { PublicationRepo } from "./publication.repo";

@Module({
  providers: [PublicationService, PublicationRepo],
  controllers: [PublicationController],
  imports: [SharedModule],
})
export class PublicationModule {}
