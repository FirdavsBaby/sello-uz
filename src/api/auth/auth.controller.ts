import { Controller, Post, Body, HttpCode, UseGuards, Req, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { IsAuthGuard } from 'src/common/guards/is-auth.guard';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-code')
  @HttpCode(201)
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }
  @Put('verify')
  @UseGuards(IsAuthGuard)
  verifyCode(@Body() updateAuthDto: UpdateAuthDto, @Req() request: Request) {
    return this.authService.verifyCode(updateAuthDto, request["verify"]);
  }
  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
  @Post('admin/login')
  adminLogin(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.adminLogin(loginAuthDto);
  }
}
