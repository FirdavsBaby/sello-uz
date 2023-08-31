import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from 'src/infra/entities/Brand.entity';
import { User } from 'src/infra/entities/User.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, User]), JwtModule.register({
    secret: process.env.SECRET_API_KEY,
        signOptions: {expiresIn: "365d"}
      })],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
