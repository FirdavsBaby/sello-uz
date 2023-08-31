import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IsAuthGuard } from 'src/common/guards/is-auth.guard';
import { CurrentUserGuard } from 'src/common/guards/current-user.guard';
import { IsAdminGuard } from 'src/common/guards/is-admin.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('new')
  @UseGuards(IsAuthGuard, CurrentUserGuard, IsAdminGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }
  @Get()
  findAll(
    @Query('search') search: string,
    @Query('category') category: string,
    @Query('start_price') startPrice: number,
    @Query('end_price') endPrice: number,
    @Query('discount') discount: string,
    @Query('brand') brand: string,
    @Query('catalog') catalog: string,
    @Query('count') count: string,
  ) {
    return this.productsService.findAll(search, category, startPrice, endPrice, discount, brand,catalog, count);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Get('/without/discount')
  withOutDiscount() {
    return this.productsService.withOutDiscount();
  }

  @Put('update/:id')
  @UseGuards(IsAuthGuard, CurrentUserGuard, IsAdminGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete('delete/:id')
  @UseGuards(IsAuthGuard, CurrentUserGuard, IsAdminGuard)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
