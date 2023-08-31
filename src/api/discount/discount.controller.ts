import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { IsAuthGuard } from 'src/common/guards/is-auth.guard';
import { CurrentUserGuard } from 'src/common/guards/current-user.guard';
import { IsAdminGuard } from 'src/common/guards/is-admin.guard';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post('new')
  @UseGuards(IsAuthGuard, CurrentUserGuard, IsAdminGuard)
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountService.create(createDiscountDto);
  }

  @Get()
  findAll() {
    return this.discountService.getAll();
  }  

  @Delete('delete/:id')
  @UseGuards(IsAuthGuard, CurrentUserGuard, IsAdminGuard)
  remove(@Param('id') id: string) {
    return this.discountService.remove(id);
  }
}
