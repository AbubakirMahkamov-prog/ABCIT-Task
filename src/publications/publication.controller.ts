import { Body, Controller, Get, HttpException, Param, Post, Redirect } from "@nestjs/common";
import { PublicationService } from "./publication.service";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { PublicationDto } from "./dto";

@ApiTags("Publications")
@Controller("publication")
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @ApiBody({
    type: PublicationDto,
    description: "Insert publication",
  })
  @Post("/")
  async insertPublication(@Body() data: PublicationDto) {
      return await this.publicationService.insertPublication(data);
  }
}
