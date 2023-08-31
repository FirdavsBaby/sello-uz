import "dotenv/config"
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './api/auth/auth.module';
import { MailService } from './shared/services/mail.service';
import { UserRepo } from './infra/repositories/User.repo';
import { AdminService } from './api/admin/admin.service';
import { User } from './infra/entities/User.entity';
import { CatalogModule } from './api/catalog/catalog.module';
import { CategoryModule } from './api/category/category.module';
import { BrandModule } from './api/brand/brand.module';
import {FileModule} from './api/file/file.module'
import { ProductsModule } from './api/products/products.module';
import { DiscountModule } from './api/discount/discount.module';
import { LikeModule } from './api/like/like.module';
import { CartModule } from './api/cart/cart.module';
import { ReviewModule } from './api/review/review.module';
import { PurchaseModule } from './api/purchase/purchase.module';
import * as bcrypt from 'bcrypt'

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    url: process.env.CONNECTION_STRING,
    synchronize: true,
    autoLoadEntities: true,
    ssl: true,
  }), UsersModule, AuthModule, TypeOrmModule.forFeature([User]), CatalogModule, CategoryModule, BrandModule, FileModule, ProductsModule, DiscountModule, LikeModule, CartModule, ReviewModule, PurchaseModule],
  controllers: [AppController],
  providers: [AppService, MailService, AdminService]
})
export class AppModule implements  OnApplicationBootstrap {
  constructor(@InjectRepository(User) private readonly useRepo: UserRepo, private adminService: AdminService) {}
  async onApplicationBootstrap() {
    const adminExists = await this.adminService.checkAdminExist();
    if (!adminExists) {
      const hashPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12)
      const admin = this.useRepo.create({email: process.env.ADMIN_EMAIL, password: hashPassword, isVerified: true, username: "admin", role: "admin"})
      await this.useRepo.save(admin)
    }
  }
}
