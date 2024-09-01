import {  Injectable } from "@nestjs/common";
import { BaseRepo } from "../shared/providers/base.dao";
import { RegisterDto, AuthDto } from "./dto";
// import { InterviewerNotFoundException } from "../shared/error/interviewer/interviewer.exception";
import { UserNotFoundException } from "../shared/error/user-exception";

@Injectable()
export class AuthRepo extends BaseRepo<any> {

  constructor() {
    super("auth");
  }
  async getUserByEmail(email: string) {
    try {
      const knex = this.knex;
      return  knex
        .from("users")
        .select("*")
        .where(knex.raw(`email = '${email}'`))
        .first();
    }catch (e) {
      console.log(`Error occurred at loginUser  = ${e}`)
    }
  }

  async registerUser(data:  AuthDto){
    try {
      const knex = this.knex;
      const id = this.generateRecordId();

      return knex("users")
        .insert({
          id,
          ...data,
        })
        .returning("*");
    }catch (e) {
      console.log(`Error occurred at Users ${e}`)
    }
  }

  async getUserById(_id:string){
    try {
      const knex = this.knex;
       return knex.from("users").where({id:_id}).first();
    }catch (e) {
      console.log(`Error occurred at getUserById ${e}`)
    }
  }
  async updateUserById(_id:string, data: object){
    return this.knex.transaction(async (trx)=>{
      const user = await trx.select("id")
        .from("users")
        .where("id", _id).first()

      if(!user){
        throw new UserNotFoundException()
      }
      return trx.update(data)
        .from("users")
        .where("id", _id);

    }).then(data => data)

  }
}
