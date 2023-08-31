import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../infra/entities/User.entity';
import { UserRepo } from '../../infra/repositories/User.repo';



@Injectable()
export class AdminService {
    constructor(@InjectRepository(User) private readonly userRepo: UserRepo) {}
    async checkAdminExist(): Promise<boolean> {
        const admin = await this.userRepo.findOne({where: {email: process.env.ADMIN_EMAIL}})
        return !!admin
    }
}
