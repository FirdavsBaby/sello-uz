import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/infra/entities/User.entity';
import { UserRepo } from 'src/infra/repositories/User.repo';

@Injectable()
export class CurrentUserGuard implements CanActivate {
  constructor(@InjectRepository(User) private readonly userRepo: UserRepo) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const verify = request["verify"]

    const user = await this.userRepo.findOne({where: {id: verify.id}, relations: ['like', 'cart']})

    if (!user) throw new BadRequestException()
    
    if (!user.isVerified) throw new BadRequestException("User not verified")

    request["user"] = user
    return true;
  }
}
