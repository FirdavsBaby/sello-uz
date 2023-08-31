import { Controller, Get, Post, Body, Put, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsAuthGuard } from 'src/common/guards/is-auth.guard';
import { CurrentUserGuard } from 'src/common/guards/current-user.guard';
import { UpdateBalance } from './dto/update-blanace.dto';
import { IsAdminGuard } from 'src/common/guards/is-admin.guard';



@Controller('profile')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  @UseGuards(IsAuthGuard, CurrentUserGuard, IsAdminGuard)
  users() {
    return this.usersService.users();
  }

  @Get('me')
  @UseGuards(IsAuthGuard, CurrentUserGuard)
  findOne(@Req() request: Request) {
    return this.usersService.getMe(request["user"]);
  }
  @Get('me/admin')
  @UseGuards(IsAuthGuard, CurrentUserGuard, IsAdminGuard)
  admin(@Req() request: Request) {
    return this.usersService.getAdmin(request["user"]);
  }

  @Put('change/password')
  @UseGuards(IsAuthGuard, CurrentUserGuard)
  update(@Body() updateUserDto: UpdateUserDto, @Req() request: Request) {
    return this.usersService.update(updateUserDto, request["user"]);
  }
  @Put('update')
  @UseGuards(IsAuthGuard, CurrentUserGuard)
  updateProfile(@Body() updateUserDto: UpdateUserDto, @Req() request: Request) {
    return this.usersService.updateProfile(updateUserDto, request["user"]);
  }

  @Put('replenish/balance')
  @UseGuards(IsAuthGuard, CurrentUserGuard)
  replenishBalance(@Body() updateBalanceDto: UpdateBalance, @Req() request: Request) {
    return this.usersService.replenish(updateBalanceDto, request["user"]);
  }
}
