import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { IsAuthGuard } from 'src/common/guards/is-auth.guard';
import { CurrentUserGuard } from 'src/common/guards/current-user.guard';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('new')
  @UseGuards(IsAuthGuard, CurrentUserGuard)
  create(@Body() createReviewDto: CreateReviewDto, @Req() request: Request) {
    return this.reviewService.create(createReviewDto, request['user']);
  }
  @Get()
  @UseGuards(IsAuthGuard, CurrentUserGuard)
  findAll() {
    return this.reviewService.findAll();
  }

  @Delete('delete/:id')
  @UseGuards(IsAuthGuard, CurrentUserGuard)
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.reviewService.remove(id, request['user']);
  }
}
