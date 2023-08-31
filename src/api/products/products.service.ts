import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/infra/entities/Product.entity';
import { ProductRepo } from 'src/infra/repositories/Product.repo';
import { Like } from 'typeorm';
import { Category } from 'src/infra/entities/Category.entity';
import { CategoryRepo } from 'src/infra/repositories/Category.repo';
import { Brand } from 'src/infra/entities/Brand.entity';
import { BrandRepo } from 'src/infra/repositories/Brand.repo';
import { Catalog } from 'src/infra/entities/Catalog.entity';
import { CatalogRepo } from 'src/infra/repositories/Catalog.repo';

@Injectable()
export class ProductsService  {
  constructor(@InjectRepository(Product) private readonly productsRepo: ProductRepo, @InjectRepository(Category) private readonly categoryRepo: CategoryRepo,  @InjectRepository(Brand) private readonly brandRepo: BrandRepo, @InjectRepository(Catalog) private readonly catalogRepo: CatalogRepo){}
  async create({title, info, photo, price, brand, category, description}: CreateProductDto) {
    try {
    const findBrand = await this.brandRepo.findOneBy({id: brand})
    const findCategory = await this.categoryRepo.findOneBy({id: category})
    const findCatalog = await this.catalogRepo.findOneBy({id: findCategory.catalog_id})
    const product =  this.productsRepo.create({title, info, photo, price, brand: findBrand, category: findCategory, catalog: findCatalog, description})
    await this.productsRepo.save(product)
    return {message: "Product created successfully."}
    } catch (error) {
    if (error) throw new BadRequestException("Brand or Category not found")
    }
  }

  async findAll(
    search: string,
    category: string,
    startPrice: number,
    endPrice: number,
    discount: string,
    brand: string,
    catalog: string,
    count: string
  ) {
    try {
      const queryBuilder = this.productsRepo.createQueryBuilder("product");
    queryBuilder
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.brand", "brand")
      .leftJoinAndSelect("product.discount", "discount")
      .leftJoinAndSelect("product.review", "review")
      .leftJoinAndSelect('product.catalog', 'catalog')
      
      
    if (search) {
      queryBuilder.where("product.title LIKE :search", { search: `%${search}%` });
    }
  
    if (category) {
      queryBuilder.andWhere("category.name = :category", { category });
    }
  
    if (startPrice) {
      queryBuilder.andWhere("product.price >= :startPrice", { startPrice });
    }
  
    if (endPrice) {
      queryBuilder.andWhere("product.price <= :endPrice", { endPrice });
    }
  
    if (discount) {      
      if (discount === "all-discounts") {
        queryBuilder.andWhere("discount IS NOT NULL", {discount});
      }
      else {
        queryBuilder.andWhere("discount.percent = :discount", {discount});
      }
    }
  
    if (brand) {
      queryBuilder.andWhere("brand.name = :brand", { brand });
    }
  
    if (catalog) {
      const findCatalog = await this.catalogRepo.findOne({ where: {name: catalog}});
      queryBuilder.andWhere("product.catalog.id = :catalog", { catalog: findCatalog.id });
    }
    
    const countToNum = +count    

    const products = await queryBuilder.take(countToNum).getMany()

    const countProducts = await queryBuilder.getCount()

  
    if (!search && !category && !startPrice && !endPrice && discount === "all-discounts" && !brand && !catalog && !count) {
      
      const allProducts = await this.productsRepo.find({ take: +count, relations: ['category', 'catalog', 'discount', 'brand']});
      return allProducts;
    }
  
    return {products, count: countProducts};
    } catch (error) {
      if (error) throw new BadRequestException("Catalog not found.")
    }
  }

  async findOne(id: string) {     
   try {
    const product = await this.productsRepo.findOne({where: {id},  relations: ['category', 'brand', 'discount', 'review', 'catalog']})
    return product
  } catch (error) {
    console.log(error)
  if (error) throw new BadRequestException("Product not found")
   }
  }

  async withOutDiscount() {     
    try {
      const products = await this.productsRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.discount', 'discount')
      .where('discount IS NULL')
      .getMany();
     return products
   } catch (error) {
     console.log(error)
    }
   }

  async update(id: string, {title, info, photo, price,}: UpdateProductDto) {
    try {
    const product = await this.productsRepo.findOneBy({id})
    if (!product) throw new BadRequestException("Product not found")
    await this.productsRepo.update({id}, {
      title: title ? title : product.title, info: info ? info : product.info, photo: photo ? photo : product.photo, price: price ? price : product.price 
    })
    return {message: "Product updated successfully."}
    } catch (error) {
    if (error) throw new BadRequestException("Brand or Category not found")
    }
  }

  async remove(id: string) {
    const product = await this.productsRepo.findOneBy({id})
    if (!product) throw new BadRequestException("Product not found")
    await this.productsRepo.delete({id})
    return {message: "Product deleted successfully."}
  }
}
