import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/infra/entities/User.entity';
import { UserRepo } from 'src/infra/repositories/User.repo';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(@InjectRepository(User) private readonly userRepo: UserRepo) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user:User = request["user"]
    if (user.role !== "admin") throw new BadRequestException("You are not admin.")    
    return true;
  }
}
