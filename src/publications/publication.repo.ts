import {  Injectable } from "@nestjs/common";
import { BaseRepo } from "../shared/providers/base.dao";
import { PublicationDto } from "./dto";
import { UserNotFoundException } from "../shared/error/user-exception";

@Injectable()
export class PublicationRepo extends BaseRepo<any> {
  private commentTable = 'comments';
  private likeTable = 'likes';
  constructor() {
    super("publications");
  }
  
  async getTotalCount() {
    return await this.knex('publications').count('id as count').first();
  }
  async getPaginatedPosts(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const publications = await this.knex('publications as pb')
    .leftJoin('comments as cm', 'pb.id', 'cm.publication_id')
    .leftJoin('likes as lk', 'pb.id', 'lk.publication_id')
    .select('pb.*')
    .select(this.knex.raw('json_agg(cm.*) as comments'))
    .select(this.knex.raw('json_agg(lk.*) as likes'))
    .groupBy('pb.id')
    .limit(limit)
    .offset(offset);
    return publications;
  }

  
  async addComment(data: { publication_id: string, user_id: string, comment: string }) {
    const id = this.generateRecordId();
  }
  async editComment(data: { comment: string }, id: string) {
    return this.knex(this.commentTable).update(data).where({
        id: id
    }).returning('*')
  }
  async getByIdComment(id: string) {
    return this.knex.select('*').from(this.commentTable).where({ id: id }).first();
  }

  async addLike(data: { publication_id: string, user_id: string}) {
    const id = this.generateRecordId();
    return this.knex.insert({ ...data, id }).into(this.likeTable).returning('*');
  }

  async getLike(data: { publication_id: string, user_id: string}) {
    return this.knex.select('*').from(this.likeTable).where({
        ...data
    }).returning('*')
  }

  async removeLike(data: { publication_id: string, user_id: string}) {
    return this.knex(this.likeTable).where({ ...data }).del()
  }
}
