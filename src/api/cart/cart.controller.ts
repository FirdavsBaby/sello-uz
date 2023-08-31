import { Controller, Get, Post, Body, Param, Delete, Req, UseGuards, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { IsAuthGuard } from 'src/common/guards/is-auth.guard';
import { CurrentUserGuard } from 'src/common/guards/current-user.guard';
import { BuyCartDto } from './dto/buy-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  @UseGuards(IsAuthGuard, CurrentUserGuard)
  create(@Body() createCartDto: CreateCartDto, @Req() request: Request) {
    return this.cartService.create(createCartDto, request['user']);
  }

  @Get()
  @UseGuards(IsAuthGuard, CurrentUserGuard)
  findAll(@Req() request: Request) {
    return this.cartService.findAll(request['user']);
  }

  @Delete('clear')
  @UseGuards(IsAuthGuard, CurrentUserGuard)
  clearAll(@Req() request: Request) {
    return this.cartService.clearAll(request['user']);
  }

  @Put('count/minus/:id')
  @UseGuards(IsAuthGuard, CurrentUserGuard)
  minuscount(@Param('id') id: string, @Req() request: Request) {
    return this.cartService.minusCount(id, request['user']);
  }


  @Delete('delete/:id')
  @UseGuards(IsAuthGuard, CurrentUserGuard)
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.cartService.remove(id, request['user']);
  }
}
