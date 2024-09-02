import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthorizationGuard implements CanActivate {
  @Inject() private readonly jwtService: JwtService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
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
    return true;
  }
}
