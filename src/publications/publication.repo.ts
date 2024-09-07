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
  async getTotalCountUser() {
    return await this.knex('users').count('id as count').first();
  }
  async getByUserPaginated(page: number, limit: number) {
    const offset = (page - 1) * limit;
  
    const data = await this.knex('users as usr')
      .leftJoin('publications as pb', 'usr.id', 'pb.user_id')
      // Join for likes and the users who liked
      .leftJoin(
        this.knex('likes as l')
          .leftJoin('users as lu', 'l.user_id', 'lu.id') // Join to get full name of the user who liked
          .select(
            'l.publication_id',
            this.knex.raw(`
              json_agg(
                json_build_object(
                  'like_id', l.id,
                  'user_id', l.user_id,
                  'full_name', lu.full_name
                )
              ) AS likes
            `)
          )
          .groupBy('l.publication_id')
          .as('l'), 'pb.id', 'l.publication_id'
      )
      // Join for comments and the users who commented
      .leftJoin(
        this.knex('comments as c')
          .leftJoin('users as cu', 'c.user_id', 'cu.id') // Join to get full name of the user who commented
          .select(
            'c.publication_id',
            this.knex.raw(`
              json_agg(
                json_build_object(
                  'comment_id', c.id,
                  'user_id', c.user_id,
                  'full_name', cu.full_name,
                  'comment', c.comment
                )
              ) AS comments
            `)
          )
          .groupBy('c.publication_id')
          .as('c'), 'pb.id', 'c.publication_id'
      )
      .select(
        'usr.id',
        'usr.full_name',
        'usr.email',
        this.knex.raw(`
          json_agg(
            json_build_object(
              'publication_id', pb.id,
              'title', pb.title,
              'content', pb.content,
              'likes', COALESCE(l.likes, '[]'),
              'comments', COALESCE(c.comments, '[]')
            )
          ) AS publications
        `)
      )
      .groupBy('usr.id')
      .limit(limit)
      .offset(offset);
  
    return data;
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
    return this.knex.insert({
      id: id, 
      publication_id: data.publication_id,
      user_id: data.user_id,
      comment: data.comment
    }).into(this.commentTable).returning('*')
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
