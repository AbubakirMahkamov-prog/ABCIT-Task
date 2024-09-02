import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PublicationRepo } from "./publication.repo";
import * as _ from "lodash"
import { PublicationDto } from "./dto";
import * as bcrypt from 'bcrypt'
import type { Request } from 'express'


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


}
