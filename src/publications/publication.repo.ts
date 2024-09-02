import {  Injectable } from "@nestjs/common";
import { BaseRepo } from "../shared/providers/base.dao";
import { PublicationDto } from "./dto";
import { UserNotFoundException } from "../shared/error/user-exception";

@Injectable()
export class PublicationRepo extends BaseRepo<any> {
  private commentTable = 'comments';
  constructor() {
    super("publications");
  }
  async addComment(data: { publication_id: string, user_id: string, comment: string }) {
    const id = this.generateRecordId();
    return this.knex.insert({ ...data, id }).into(this.commentTable).returning('*');
  }
  async editComment(data: { comment: string }, id: string) {
    return this.knex(this.commentTable).update(data).where({
        id: id
    }).returning('*')
  }
  async getByIdComment(id: string) {
    return this.knex.select('*').from(this.commentTable).where({ id: id }).first();
  }
}
