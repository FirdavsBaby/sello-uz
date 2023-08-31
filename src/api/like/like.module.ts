import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/infra/entities/User.entity';
import { Product } from 'src/infra/entities/Product.entity';
import { Like } from 'src/infra/entities/Like.Entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product, Like]), JwtModule.register({
  secret: process.env.SECRET_API_KEY,
            signOptions: {expiresIn: "365d"}
          })],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
