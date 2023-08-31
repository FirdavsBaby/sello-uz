import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from 'src/infra/entities/Review.Entity';
import { User } from 'src/infra/entities/User.entity';
import { Product } from 'src/infra/entities/Product.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Product]), JwtModule.register({
  secret: process.env.SECRET_API_KEY,
            signOptions: {expiresIn: "365d"}
          })],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
