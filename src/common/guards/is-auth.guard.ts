import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class IsAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>{
    try {
      const request = context.switchToHttp().getRequest()
      const token = request.headers.authorization && request.headers.authorization.split(" ")[1]
      
      
      
      if (!token) throw new UnauthorizedException()
      const verify = await this.jwt.verify(token)
      
      request['verify'] = verify
      return true;
      } catch (error) {
        if (error) throw new BadRequestException()
      }
  }
}
