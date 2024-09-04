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
  
  async getPaginatedPublications(page = 1, limit = 10) {
    const publications = await this.publicationRepo.getPaginatedPosts(page, limit);
    const total = await this.publicationRepo.getTotalCount();
    const totalPages = Math.ceil(total.count / limit);

    return {
      data: publications,
      pagination: {
        page,
        limit,
        totalPages,
        totalPublications: parseInt(total.count),
      },
    }
  }


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

    async toogleLike(data: { publication_id: string }, request: any) {
        const currentUser = request.currentUser;
        const like = await this.publicationRepo.getLike({ publication_id: data.publication_id, user_id: currentUser.id });
        if (!like || like.length == 0) {
            try {
              await this.publicationRepo.addLike({ publication_id: data.publication_id, user_id: currentUser.id });
              return {
                message: "Liked was successfully",
                publication_id: data.publication_id,
              }
            } catch(err) {
              return err;
            }
        }
        try {
          await this.publicationRepo.removeLike({ publication_id: data.publication_id, user_id: currentUser.id });
            return {
                message: "Like was removed successfully",
                publication_id: data.publication_id,
              }
        } catch (err) {
          return err;
        }
    }
}
