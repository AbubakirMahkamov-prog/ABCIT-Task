import {  Injectable } from "@nestjs/common";
import { BaseRepo } from "../shared/providers/base.dao";
import { PublicationDto } from "./dto";
import { UserNotFoundException } from "../shared/error/user-exception";

@Injectable()
export class PublicationRepo extends BaseRepo<any> {

  constructor() {
    super("publications");
  }
}
