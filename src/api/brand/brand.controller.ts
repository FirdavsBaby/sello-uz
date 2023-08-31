import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { IsAuthGuard } from 'src/common/guards/is-auth.guard';
import { CurrentUserGuard } from 'src/common/guards/current-user.guard';
import { IsAdminGuard } from 'src/common/guards/is-admin.guard';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post('new')
  @UseGuards(IsAuthGuard, CurrentUserGuard, IsAdminGuard)
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Get()
  findAll(@Query("name") name: string) {
    return this.brandService.findAll(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }
  
  @Delete('delete/:id')
  @UseGuards(IsAuthGuard, CurrentUserGuard, IsAdminGuard)
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }
}
