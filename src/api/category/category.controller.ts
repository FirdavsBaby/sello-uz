import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { IsAuthGuard } from 'src/common/guards/is-auth.guard';
import { CurrentUserGuard } from 'src/common/guards/current-user.guard';
import { IsAdminGuard } from 'src/common/guards/is-admin.guard';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  
  @Post('new')
  @UseGuards(IsAuthGuard, CurrentUserGuard, IsAdminGuard)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  getAll() {
    return this.categoryService.getAll();
  }

  @Delete('delete/:id')
  @UseGuards(IsAuthGuard, CurrentUserGuard, IsAdminGuard)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
