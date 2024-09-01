import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthRepo } from "./auth.repo";
import * as _ from "lodash"
import { JwtService } from "@nestjs/jwt";
import { RegisterDto, AuthDto } from "./dto";
import { MailerService } from "../shared/providers/mailer.service";
import { confirmationSubject, confirmationMessage}  from "../shared/constants"
import { UserStatus } from "./enums";
import bcrypt from 'bcrypt'



@Injectable()
export class AuthService {
  private url:string = process.env.HOST_URL;
  constructor(private readonly authRepo: AuthRepo,
              private readonly jwtService: JwtService,
              private readonly mailerService: MailerService) {}

  async loginUser(auth: AuthDto) {
      const { email, password } = auth;

      const user =  await this.authRepo.getUserByEmail(email);
      if(_.isUndefined(user)){
        throw new HttpException('the user not found', HttpStatus.UNAUTHORIZED);
      }

      if(user.is_verified == UserStatus.UNVERIFIED){
        throw new HttpException('please firstly activate your account, than you can login.', HttpStatus.UNAUTHORIZED);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new HttpException("Password didn't match", HttpStatus.UNAUTHORIZED);
      }
      return this.generateToken(user);
  }


  async generateToken(user:object){
   const access_token = await this.jwtService.signAsync({
       ...user,
     },
     {
       algorithm: 'HS256',
       expiresIn: process.env.JWT_EXPIRES_IN,
       secret: process.env.JWT_SECRET,
       privateKey: process.env.JWT_SECRET,
     }
   );

   return { access_token, user };
  }
  async registerUser(_user: RegisterDto){
    const { email, password } = _user;
    const user =  await this.authRepo.getUserByEmail(email);
    if(!_.isUndefined(user)){
      throw new HttpException('this mail already exists', HttpStatus.CONFLICT);
    }
    const newUser = await this.authRepo.registerUser(_user);

    if(_.isUndefined(newUser)){
      throw new HttpException('something wrong with your data', HttpStatus.BAD_REQUEST);
    }
    await this.mailerService.sendMessage(
      email,
      confirmationSubject,
      confirmationMessage(`${this.url}/api/auth/confirm-user-email/${newUser[0]?.id}`
      ))
    return newUser;
  }



  async confirmUserEmail(_id:string){
    const data = {
      is_verified: UserStatus.VERIFIED
    }
    return this.authRepo.updateUserById(_id, data);
  }


}
