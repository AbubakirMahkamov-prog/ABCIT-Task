import { Body, Controller, Get, HttpException, Param, Post, Req, Redirect, UseGuards, Patch } from "@nestjs/common";
import { PublicationService } from "./publication.service";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { PublicationDto, CommentDto, EditCommentDto, LikeDto } from "./dto";
import { AuthorizationGuard } from '../shared/guards/authorization.guard'
import { RouteName } from '../shared/guards/specialRoute';

import type { 
    Request
} from 'express'


@ApiTags("Publications")
@Controller("publication")
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}
  
  @ApiBody({
    type: PublicationDto,
    description: "Insert publication",
  })
  @UseGuards(AuthorizationGuard)
  @Post("/")
  async insertPublication(@Body() data: PublicationDto, @Req() request: Request) {
    return await this.publicationService.insertPublication(data, request);
  }
   
  @ApiBody({
    type: PublicationDto,
    description: "Update publication",
  })
  @UseGuards(AuthorizationGuard)
  @Patch("/:id")
  async updatePublication(@Body() data: PublicationDto, @Param('id') id: string) {
    return await this.publicationService.updatePublication(data, id);
  }

  @UseGuards(AuthorizationGuard)
  @Get("/:id")
  async getByIdPublication(@Param('id') id: string) {
    return await this.publicationService.getByIdPublication(id);
  }

  @ApiBody({
    type: CommentDto,
    description: "Add comment",
  })
  @UseGuards(AuthorizationGuard)
  @Post("/comment")
  async addComment(@Body() data: CommentDto, @Req() request: Request) {
    return await this.publicationService.addComment(data, request);
  }
  @ApiBody({
    type: CommentDto,
    description: "Add comment",
  })

  @UseGuards(AuthorizationGuard)
  @Patch("/comment/:id")
  async editComment(@Body() data: CommentDto, @Param('id') id: string, @Req() request: Request) {
    return await this.publicationService.editComment(data, id, request);
  }

  @ApiBody({
    type: LikeDto,
    description: "Toogle like",
  })
  @UseGuards(AuthorizationGuard)
  @RouteName('/toogle-like')
  @Post("/toogle-like")
  async toogleLike(@Body() data: LikeDto, @Req() request: Request) {
    return this.publicationService.toogleLike(data, request);
  }
  
}
