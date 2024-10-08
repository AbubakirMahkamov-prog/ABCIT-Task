import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { PleaseVerify } from '../error/user-exception'
import { KnexService } from "../providers/knex.service";

@Injectable()
export class AuthorizationGuard implements CanActivate {
  @Inject() private readonly jwtService: JwtService;
  @Inject() private readonly reflector: Reflector;
  @Inject() private readonly knexService: KnexService;
  private readonly publicForUnverfied = ['/toogle-like', '/comment', '/edit-user'];
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const routeName = this.reflector.get<string>('routeName', context.getHandler());
    let access_token = request.headers.authorization;
    if (!access_token) {
      throw new UnauthorizedException();
    }

    try {
      if (access_token.startsWith("Bearer ")) {
        access_token = access_token.substring("Bearer ".length);
      }
      await this.jwtService.verifyAsync(access_token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
    const decoded_token = await this.jwtService.decode(access_token);
    if (!decoded_token) {
      throw new UnauthorizedException();
    }
    request.currentUser = decoded_token;
    const knex = this.knexService.instance;
    const user = await knex.select('*').from('users').where('id', request.currentUser.id).first();
    if (!this.publicForUnverfied.includes(routeName) && !user.is_verified) {
      throw new PleaseVerify();
    }
    return true;
  }
}
