import { Controller, Get, Post, Body, Param, Delete, Req, UseGuards} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { IsAuthGuard } from 'src/common/guards/is-auth.guard';
import { CurrentUserGuard } from 'src/common/guards/current-user.guard';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('add')
  @UseGuards(IsAuthGuard, CurrentUserGuard)
  create(@Body() createLikeDto: CreateLikeDto, @Req() request: Request) {
    return this.likeService.create(createLikeDto, request['user']);
  }

  @Get()
  @UseGuards(IsAuthGuard, CurrentUserGuard)
  findAll(@Req() request: Request) {
    return this.likeService.findAll(request['user']);
  }

  @Delete('clear')
  @UseGuards(IsAuthGuard, CurrentUserGuard)
  deleteAll(@Req() request: Request) {
    return this.likeService.deleteAll(request['user']);
  }

  @Delete('delete/:id')
  @UseGuards(IsAuthGuard, CurrentUserGuard)
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.likeService.remove(id, request['user']);
  }
}
