import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from 'src/infra/entities/Discount.Entity';
import { DiscountRepo } from 'src/infra/repositories/Discount.repo';
import { Product } from 'src/infra/entities/Product.entity';
import { ProductRepo } from 'src/infra/repositories/Product.repo';

@Injectable()
export class DiscountService {
  constructor(@InjectRepository(Discount) private readonly discountRepo: DiscountRepo, @InjectRepository(Product) private readonly productRepo: ProductRepo){}
  async create({product_id, percent, end_date}: CreateDiscountDto) {
    const checkDiscount = await this.discountRepo.findOneBy({ product: { id: product_id } });
    if (checkDiscount) {
      throw new BadRequestException("This product already has a discount");
    }

    const product = await this.productRepo.findOneBy({id: product_id});
    if (!product) {
      throw new NotFoundException("Product not found");
    }
  
    const discount = this.discountRepo.create({ percent, end_date, product });
    await this.discountRepo.save(discount);
  
    return { message: "Discount created successfully" };
  }

  async getAll() {
    const discount = await this.discountRepo.find({relations: ['product']})
    return discount
  }

  async remove(id: string) {
    const checkDiscount = await this.discountRepo.findOneBy({id})
    if (!checkDiscount) throw new BadRequestException("Discount not found")
    this.discountRepo.delete({id})
    return {message:"Discount deleted successfully."}
  }
}
