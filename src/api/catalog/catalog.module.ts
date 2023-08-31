import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Catalog } from 'src/infra/entities/Catalog.entity';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/infra/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Catalog, User]), JwtModule.register({
  secret: process.env.SECRET_API_KEY,
      signOptions: {expiresIn: "365d"}
    })],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class CatalogModule {}
