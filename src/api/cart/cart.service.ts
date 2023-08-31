import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from 'src/infra/entities/Cart.Entity';
import { CartRepo } from 'src/infra/repositories/Cart.repo';
import { User } from 'src/infra/entities/User.entity';
import { Product } from 'src/infra/entities/Product.entity';
import { ProductRepo } from 'src/infra/repositories/Product.repo';
import { UserRepo } from 'src/infra/repositories/User.repo';

@Injectable()
export class CartService {
  constructor(@InjectRepository(CartItem) private readonly cartRepo: CartRepo, @InjectRepository(Product) private readonly productRepo: ProductRepo, @InjectRepository(User) private readonly userRepo: UserRepo){}
  async create({product_id}: CreateCartDto, user: User) {
    const checkCart = await this.cartRepo.findOneBy({ purchased: false, product: { id: product_id }, user: {id: user.id}})
    if (checkCart) {
      await this.cartRepo.update({id: checkCart.id}, {count: checkCart.count + 1})
      return {message: "Cart updated successfully."}
    }
    const product = await this.productRepo.findOneBy({id: product_id})
    if (!product) throw new BadRequestException("Product not found")
    const cartItem = this.cartRepo.create({product, user})
    await this.cartRepo.save(cartItem)
    return {message: "Product added to cart"}
  }


  async findAll({id}:User) {
    const cart = await this.cartRepo.find({where: {user: {id}, purchased: false}, relations: ['product', 'product.discount']})
    return cart 
  }
  async clearAll({id}:User) {
    await this.cartRepo.delete({user: {id: id}, purchased: false})
    return {message: "Cart cleared successfully"} 
  }

  async remove(id: string, {id : user_id}: User) {
    const cart = await this.cartRepo.findOneBy({id, user:{id: user_id}, purchased: false})
    if (!cart) throw new BadRequestException("Cart item not found")
    this.cartRepo.delete({id})
    return {message: "Cart item deleted successfully."}
  }
  async minusCount(id: string, {id : user_id}: User) {
    const cart = await this.cartRepo.findOneBy({user: {id: user_id}, product: {id}})
    if (!cart) throw new BadRequestException("Cart item not found")
    this.cartRepo.update({product: {id}}, {count: cart.count - 1})
    return {message: "Count minus successfully."}
  }
}
