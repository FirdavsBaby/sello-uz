import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from 'src/infra/entities/Purchase.Entity';
import { User } from 'src/infra/entities/User.entity';
import { JwtModule } from '@nestjs/jwt';
import { CartItem } from 'src/infra/entities/Cart.Entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, User, CartItem]), JwtModule.register({
  secret: process.env.SECRET_API_KEY,
            signOptions: {expiresIn: "365d"}
          })],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}
