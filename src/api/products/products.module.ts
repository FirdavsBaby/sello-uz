import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/infra/entities/Product.entity';
import { User } from 'src/infra/entities/User.entity';
import { JwtModule } from '@nestjs/jwt';
import { Category } from 'src/infra/entities/Category.entity';
import { Brand } from 'src/infra/entities/Brand.entity';
import { Catalog } from 'src/infra/entities/Catalog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User, Category, Brand, Catalog]), JwtModule.register({
  secret: process.env.SECRET_API_KEY,
        signOptions: {expiresIn: "365d"}
      })],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
