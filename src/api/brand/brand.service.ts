import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/infra/entities/Brand.entity';
import { BrandRepo } from 'src/infra/repositories/Brand.repo';
import { ILike } from 'typeorm';

@Injectable()
export class BrandService {
  constructor(@InjectRepository(Brand) private readonly brandRepo: BrandRepo){}
  async create({name, photo}: CreateBrandDto) {
    const findBrand = await this.brandRepo.findOneBy({name})
    if (findBrand) throw new BadRequestException("Brand already exist")
    const brand = this.brandRepo.create({name, photo})
    await this.brandRepo.save(brand)
    return {message: "Brand added successfully."}
  }

  async findAll(name: string) {
    let res = null
    if (name) {
       res = await this.brandRepo.find({where: {
        name: ILike(`${name}%`)
      }})
      
    }else {
      res = await this.brandRepo.find()
    }
    return res
  }

  async findOne(id: string) {
    const findBrand = await this.brandRepo.findOne({where: {id}, relations: {
      products: true
    }})
    if (findBrand) throw new BadRequestException("Brand not found")
    return {findBrand}
  }


  async remove(id: string) {
    const findBrand = await this.brandRepo.findOneBy({id})
    if (!findBrand) throw new BadRequestException("Brand not found")
    await this.brandRepo.delete({id})
    return {message: "Brand deleted successfully."}
  }
}
