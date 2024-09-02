import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PublicationRepo } from "./publication.repo";
import * as _ from "lodash"
import { PublicationDto,CommentDto } from "./dto";
import * as bcrypt from 'bcrypt'
import type { Request } from 'express'
import { RecordBelongsToOthers } from '../shared/error/user-exception'

@Injectable()
export class PublicationService {
  constructor(private readonly publicationRepo: PublicationRepo) {}
  
  async insertPublication(data: PublicationDto, request: any) {
      const currentUser = request.currentUser;
      const newRecord =  await this.publicationRepo.insert({
        ...data,
        user_id: currentUser.id
      });
      return newRecord;
  }
  async updatePublication(data: PublicationDto, id: string) {
    return this.publicationRepo.updateById(id, data)
  }
  async getByIdPublication(id: string){
    return this.publicationRepo.getById(id)
  }
  async addComment(data: CommentDto, request: any) {
    const currentUser = request.currentUser;
    return this.publicationRepo.addComment({ ...data, user_id: currentUser.id });
  }
  async editComment(data: { comment: string }, id: string, request: any) {
    const comment = await this.publicationRepo.getByIdComment(id);
    const currentUser = request.currentUser;

    if (!comment || currentUser.id !== comment.user_id) {
        throw new RecordBelongsToOthers()
    }
    return this.publicationRepo.editComment(data, id);
  }

}
