import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/infra/entities/User.entity';
import { CartItem } from 'src/infra/entities/Cart.Entity';
import { Product } from 'src/infra/entities/Product.entity';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from 'src/shared/services/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, CartItem, Product]), JwtModule.register({
  secret: process.env.SECRET_API_KEY,
        signOptions: {expiresIn: "365d"}
      })],
  controllers: [CartController],
  providers: [CartService, MailService],
  exports: [CartService]
})
export class CartModule {}
