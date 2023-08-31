import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/infra/entities/User.entity';
import "dotenv/config"
import { JwtModule } from '@nestjs/jwt';
import { CartService } from '../cart/cart.service';
import { CartItem } from 'src/infra/entities/Cart.Entity';
import { Product } from 'src/infra/entities/Product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, CartItem, Product]), JwtModule.register({
  secret: process.env.SECRET_API_KEY,
      signOptions: {expiresIn: "365d"}
    })],
  controllers: [UsersController],
  providers: [UsersService, CartService],
  exports: [UsersService]
})
export class UsersModule {}
