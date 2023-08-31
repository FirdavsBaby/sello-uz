import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { User } from 'src/infra/entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepo } from 'src/infra/repositories/User.repo';
import { Product } from 'src/infra/entities/Product.entity';
import { ProductRepo } from 'src/infra/repositories/Product.repo';
import { LikeRepo } from 'src/infra/repositories/Like.repo';
import { Like } from 'src/infra/entities/Like.Entity';

@Injectable()
export class LikeService {
  constructor(@InjectRepository(Product) private readonly productRepo: ProductRepo, @InjectRepository(Like) private readonly likeRepo: LikeRepo){}
  async create({product_id}: CreateLikeDto, user: User) {
    const checkLike = await this.likeRepo.findOneBy({user: {id: user.id}, product: {id: product_id}})
    if (checkLike) throw new BadRequestException("Product already liked")
    const product = await this.productRepo.findOneBy({id: product_id});
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    const like = this.likeRepo.create({product, user})
    await this.likeRepo.save(like)
    return {message: "Product liked successfully."}
  }

  async findAll({id}:User) {
    let likes = null
      likes = await this.likeRepo.find({
      where: { user: { id: id } },
      relations: ['user', 'product', 'product.discount']
    });
    return likes
    } 

  async deleteAll({id}:User) {
   await this.likeRepo.delete({user: {id}})
    return {message: "Likes cleared successfully"}
  }  

  async remove(id: string, user: User) {
    const checkLike = await this.likeRepo.findOneBy({product: {id}, user: {id: user.id}})
    if (!checkLike) throw new BadRequestException("Like not found")
    await this.likeRepo.delete({product: {id}})
    return {message: "Product uliked successfully"}
  }
}
