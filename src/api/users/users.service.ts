import { Injectable, HttpException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/infra/entities/User.entity';
import { UserRepo } from 'src/infra/repositories/User.repo';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { UpdateBalance } from './dto/update-blanace.dto';
import {Stripe} from 'stripe';
import { CartService } from '../cart/cart.service';


const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: '2023-08-16'
})

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepo: UserRepo, private readonly jwt: JwtService, private readonly cartService: CartService) {}

  async getMe(user: User) {
    const getme = await this.userRepo.findOne({where: {id: user.id}, relations: ['like.product']})
    const cart = await this.cartService.findAll(user)
    const me = {...getme, cart}
    return me
  }

  async users() {
    const users = await this.userRepo.find({where: {isVerified: true}})
    return users
  }
  
  async getAdmin(user: User) {
    const getme = await this.userRepo.findOne({where: {id: user.id}, relations: ['like.product']})
    const cart = await this.cartService.findAll(user)
    const me = {...getme, cart}
    return me
  }

   async replenish({amount, id}: UpdateBalance,user: User) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Payment",
      payment_method: id,
      confirm: true,
      confirmation_method: "automatic",
      capture_method: "automatic",
      return_url: 'https://example.com/success',
    });
    
    await this.userRepo.update({id: user.id},{balance: user.balance + amount})
    return {message: "Balance replanished successfully."}
  }

  async update({password}: UpdateUserDto, {id}: User) {
    const hashPassword = await bcrypt.hash(password, 12)
    await this.userRepo.update({id}, {
      password: hashPassword
    })
    return {message: "Successfully."}
  }
  async updateProfile({password, email, username, first_name, last_name, number, photo, gender, language, birth}: UpdateUserDto, user: User) {
    const {
      id,
      password : old_password,
      email: old_email,
      username: old_username,
      first_name: old_first_name,
      last_name: old_last_name,
      number: old_number,
      photo: old_photo,
      gender: old_gender,
      language: old_language,
      birth: old_birth
    } = user
    if (password) {
       password = await bcrypt.hash(password, 12)
    }
    await this.userRepo.update({id}, {
      password: password ? password : old_password,
      email: email ? email : old_email,
      username: username ? username : old_username,
      first_name: first_name ? first_name : old_first_name,
      last_name: last_name ? last_name : old_last_name,
      number: number ? number : old_number,
      photo: photo ? photo : old_photo,
      gender: gender? gender : old_gender,
      language: language? language : old_language,
      birth: birth? birth : old_birth
    })
    return {message: "Successfully."}
  }
}
