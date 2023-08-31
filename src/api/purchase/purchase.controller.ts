import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { IsAuthGuard } from 'src/common/guards/is-auth.guard';
import { CurrentUserGuard } from 'src/common/guards/current-user.guard';
import { IsAdminGuard } from 'src/common/guards/is-admin.guard';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post('new')
  @UseGuards(IsAuthGuard, CurrentUserGuard)
  create(@Body() createPurchaseDto: CreatePurchaseDto, @Req() request: Request) {
    return this.purchaseService.create(createPurchaseDto, request['user']);
  }

  @Get()
  @UseGuards(IsAuthGuard, CurrentUserGuard, IsAdminGuard)
  findAll() {
    return this.purchaseService.findAll();
  }

  @Get('my')
  @UseGuards(IsAuthGuard, CurrentUserGuard)
  findmy(@Req() request: Request) {
    return this.purchaseService.findmy(request['user']);
  }


  @Get(':id')
  @UseGuards(IsAuthGuard, CurrentUserGuard)
  findOne(@Param('id') id: string, @Req() request: Request) {
    return this.purchaseService.findOne(id, request['user']);
  }

  @Put('update/status/:id')
  @UseGuards(IsAuthGuard, CurrentUserGuard, IsAdminGuard)
  update(@Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto) {
    return this.purchaseService.update(id, updatePurchaseDto);
  }
  @Put('cancel/:id')
  @UseGuards(IsAuthGuard, CurrentUserGuard)
  cancel(@Param('id') id: string, @Req() request: Request) {
    return this.purchaseService.cancel(id, request['user']);
  }
}
