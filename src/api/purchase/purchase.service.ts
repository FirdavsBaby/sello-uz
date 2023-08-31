import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from 'src/infra/entities/Purchase.Entity';
import { PurchaseRepo } from 'src/infra/repositories/Purchase.repo';
import { User } from 'src/infra/entities/User.entity';
import { UserRepo } from 'src/infra/repositories/User.repo';
import { CartItem } from 'src/infra/entities/Cart.Entity';
import { CartRepo } from 'src/infra/repositories/Cart.repo';
import { codeGenerator } from 'src/shared/utils/code-generator';

@Injectable()
export class PurchaseService {
  constructor(@InjectRepository(Purchase) private readonly purchaseRepo: PurchaseRepo, @InjectRepository(User) private readonly userRepo: UserRepo, @InjectRepository(CartItem) private readonly cartRepo: CartRepo) {}
  async create({location}: CreatePurchaseDto, {id}: User) {
    const user = await this.userRepo.findOne({where: {id: id, cart: {purchased: false}}, relations: ['cart', 'cart.product']})
    if (!location.street || !location.city || !location.avenue || !location.district) throw new BadRequestException("Location must be a valid city, disctrict, street, avenue") 
    if (!user?.cart.length) throw new BadRequestException("Cart is empty")
    
    const code = codeGenerator()
    const cart_number = codeGenerator()
    let totalPrice = 0
    
    for (let i = 0; i < user.cart.length; i++) {
      totalPrice += user.cart[i].product.price
    }


    
    if (user.balance < totalPrice) throw new BadRequestException("Balance very low")
    await this.userRepo.update({id: id}, {balance: user.balance - totalPrice});
    const purchase = this.purchaseRepo.create({user, location, secret_key: code, cart_number: cart_number, cartItems: user.cart, total: totalPrice})
    await this.purchaseRepo.save(purchase)

    for (let i = 0; i < user.cart.length; i++) {
      let id = user.cart[i].id
      await this.cartRepo.update({id}, {purchased: true})
    }
    return {message: "Thank you for your purchase, our staff will contact you shortly"}
  }

  async findAll() {
    const purchases = await this.purchaseRepo.find({where: {canceled: false},relations: ['user', 'cartItems.product']})
    return purchases
  }
  async findmy({id}: User) {
    const purchases = await this.purchaseRepo.find({where: {user: {id}}, relations: ["user", 'cartItems.product']})
    return purchases
  }

  async findOne(id: string, {id : user_id}: User) {
    const purchase = await this.purchaseRepo.findOne({where: {id, user: {id: user_id}, canceled: false}, relations: ["user", 'cartItems.product']})
    if (!purchase) throw new BadRequestException("Purchase not found")
    return purchase 
  }

  async update(id: string, {status}: UpdatePurchaseDto) {
    const purchase = await this.purchaseRepo.findOne({where: {id, canceled: false}, relations: ['user', 'cartItems.product']})
    if (!purchase) throw new BadRequestException("Purchase not found")
    await this.purchaseRepo.update({id}, {status})
    return {message: "Purchase updated sucessfully."}
  }
  async cancel(id: string, {id :  user_id, balance}: User) {
  const purchase = await this.purchaseRepo.findOne({where: {id, user: {id: user_id}}, relations: ['user', 'cartItems.product']})
    if (!purchase) throw new BadRequestException("Purchase not found")
    await this.purchaseRepo.update({id}, {canceled: true})
    await this.userRepo.update({id: user_id}, {balance: balance + purchase.total})
    return {message: "Purchase canceled sucessfully."}
  }
}
