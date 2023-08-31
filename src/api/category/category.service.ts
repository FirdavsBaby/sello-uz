import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/infra/entities/Category.entity';
import { CategoryRepo } from 'src/infra/repositories/Category.repo';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private readonly categoryRepo: CategoryRepo){}
  async create({name, catalog_id}: CreateCategoryDto) {
    const checkCategory = await this.categoryRepo.findOneBy({name})
    if (checkCategory) throw new BadRequestException("Category already exist")
    const category = this.categoryRepo.create({name, catalog_id})
    await this.categoryRepo.save(category)
    return {message:"Category added successfully."}
  }

  async getAll() {
    const categories = await this.categoryRepo.find()
    return categories
  }

  async remove(id: string) {
    const checkCategory = await this.categoryRepo.findOneBy({id})
    if (!checkCategory) throw new BadRequestException("Category not found")
    await this.categoryRepo.delete({id})
    return {message: "Category deleted successfully."}
  }
}
