import { Injectable, HttpException, ForbiddenException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepo } from 'src/infra/repositories/User.repo';
import { MailService } from 'src/shared/services/mail.service';
import { JwtService } from '@nestjs/jwt';
import { codeGenerator } from 'src/shared/utils/code-generator';
import { User } from 'src/infra/entities/User.entity';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt'
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepo: UserRepo, private readonly mailService: MailService, private readonly jwt: JwtService) {}
  async create({email}: CreateAuthDto) {
    try {
    const findUser = await this.userRepo.findOneBy({email})
    let token = null
    const code = codeGenerator()
    const tag  = `<h1>${code}</h1>`
    this.mailService.sendMail(email, tag, "Verification Email")
    if (!findUser &&  !findUser?.isVerified) {
      const user = this.userRepo.create({email})
      await this.userRepo.save(user)
      token = this.jwt.sign({id: user.id, code: code + ""})
      return {message: "Code sended to your email...", token}
    }
    
    await this.userRepo.update({id: findUser.id}, {isVerified: false})
    token =  this.jwt.sign({id: findUser.id, code: code + ""})
    return {message: "Code sended to your email...", token}
    } catch (error) {
      console.log(error);
    }
  }

  async verifyCode({code}: UpdateAuthDto, verify) {
    let {code : code_true, id} = verify
    if (code !== code_true) throw new ForbiddenException('Wrong code')
    await this.userRepo.update({id}, {isVerified: true})
    return {message: "Successfully."}
  }

  async adminLogin({email, password}: LoginAuthDto) {
    const user = await this.userRepo.findOneBy({email, isVerified: true, role: "admin"}) 
    if (!user) throw new ForbiddenException()
    const comparePassword = await bcrypt.compare(password, user.password)
    if (!comparePassword) throw new ForbiddenException()
    const token = this.jwt.sign({id: user.id})
    return {message: "Welcome to admin dashboard.", token}
  }

  async login({email, password}: LoginAuthDto) {
    const user = await this.userRepo.findOneBy({email, isVerified: true}) 
    if (!user) throw new ForbiddenException()
    if (!user.password) throw new HttpException("User not registered", 400)
    const comparePassword = await bcrypt.compare(password, user.password)
    if (!comparePassword) throw new ForbiddenException()
    const token = this.jwt.sign({id: user.id})
    return {message: "Logined successfully.", token}
  }

}
