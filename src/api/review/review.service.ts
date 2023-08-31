import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/infra/entities/Review.Entity';
import { ReviewRepo } from 'src/infra/repositories/Review.repo';
import { Product } from 'src/infra/entities/Product.entity';
import { ProductRepo } from 'src/infra/repositories/Product.repo';
import { User } from 'src/infra/entities/User.entity';

@Injectable()
export class ReviewService {
  constructor(@InjectRepository(Review) private readonly reviewRepo: ReviewRepo, @InjectRepository(Product) private readonly productRepo: ProductRepo){}
  async create({star, commentary, product_id, photo}: CreateReviewDto, user:User) {
      const product = await this.productRepo.findOneBy({id: product_id})
      const checkreview = await this.reviewRepo.findOne({where: {product: {id: product_id}, user: {id: user.id}}})
      if (checkreview) throw new BadRequestException("You are already review this product") 
      if (!product) throw new BadRequestException("Product not found")
      const review = this.reviewRepo.create({star, commentary, product, user, photo})
      await this.reviewRepo.save(review)
      return {message: "Review sended successfully"}
  }

  async findAll() {
    const reviews = await this.reviewRepo.find({relations: ['product']})
    return reviews
}

  async remove(id: string, {id: user_id}: User) {
    const review = await this.reviewRepo.findOne({where: {id, user: {id}}})
    if (!review) throw new BadRequestException("Review not found")
    await this.reviewRepo.delete({id})
    return {message: "Review deleted successfully."}
  }
}
