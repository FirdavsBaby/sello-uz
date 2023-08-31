import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Catalog } from 'src/infra/entities/Catalog.entity';
import { CatalogRepo } from 'src/infra/repositories/Catalog.repo';

@Injectable()
export class CatalogService {
  constructor(@InjectRepository(Catalog) private readonly catalogRepo: CatalogRepo) {}
  async create({name}: CreateCatalogDto) {
    const checkCatalog = await this.catalogRepo.findOneBy({name})
    if (checkCatalog) throw new BadRequestException("Catalog already exist")
    const catalog = this.catalogRepo.create({name})
    await this.catalogRepo.save(catalog)
    return {message: "Catalog added successfully."}
  }

  async findAll() {
    const catalogs = await this.catalogRepo.find({relations: {
      categories: true
    }})
    return catalogs
  }

  async findOne(id: string) {
    const catalogs = await this.catalogRepo.find({where: {id}, relations: {
      categories: true
    }})
    return catalogs
  }
  
  async remove(id: string) {
    const checkCatalog = await this.catalogRepo.findOneBy({id})
    if (!checkCatalog) throw new BadRequestException("Catalog not found")
    await this.catalogRepo.delete({id})
    return {message: "Catalog deleted successfully."}
  }
}
