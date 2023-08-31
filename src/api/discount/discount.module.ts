import { Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from 'src/infra/entities/Discount.Entity';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/infra/entities/User.entity';
import { Product } from 'src/infra/entities/Product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Discount, User, Product]), JwtModule.register({
  secret: process.env.SECRET_API_KEY,
          signOptions: {expiresIn: "365d"}
        })],
  controllers: [DiscountController],
  providers: [DiscountService],
})
export class DiscountModule {}
