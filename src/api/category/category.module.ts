import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/infra/entities/User.entity';
import { Category } from 'src/infra/entities/Category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, User]), JwtModule.register({
  secret: process.env.SECRET_API_KEY,
        signOptions: {expiresIn: "365d"}
      })],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
