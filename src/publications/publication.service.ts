import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PublicationRepo } from "./publication.repo";
import * as _ from "lodash"
import { PublicationDto } from "./dto";
import * as bcrypt from 'bcrypt'



@Injectable()
export class PublicationService {
  constructor(private readonly publicationRepo: PublicationRepo) {}

  async insertPublication(data: PublicationDto) {
      
      const newRecord =  await this.publicationRepo.insert({
        ...data
      });
      return newRecord;
  }

}
