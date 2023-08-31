import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/infra/entities/User.entity';
import { MailService } from 'src/shared/services/mail.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
  secret: process.env.SECRET_API_KEY,
    signOptions: {expiresIn: "365d"}
  })],
  controllers: [AuthController],
  providers: [AuthService, MailService],
})
export class AuthModule {}
