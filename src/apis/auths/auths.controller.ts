import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthsService } from './auths.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auths')
@Controller('auths')
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService, //
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({
    status: 200,
    description: 'Generate Access Token',
    type: String,
  })
  async userLogin(
    @Body() loginUserDto: LoginUserDto,
    @Res() response: Response,
  ): Promise<void> {
    const { email, password } = loginUserDto;
    const userInfo = await this.usersService.findOneByEmail(email);

    if (!userInfo)
      throw new UnprocessableEntityException(
        'There is no signup history for this email.',
      );

    const isMatch = await bcrypt.compare(password, userInfo.password);
    if (!isMatch)
      throw new UnprocessableEntityException('Passwords do not match.');

    this.authsService.setRefreshToken(userInfo, response);
    const result = await this.authsService.getAccessToken(userInfo);

    response.status(200).send(result);
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('userAccess'))
  async userLogout(@Req() request: Request) {
    // TODO: Logout 방식을 설정하여 구현 필요
    // 현재 - AccessToken, RefreshToken을 함께 발급하여
    // Logout시 두 Token을 BlackList 설정하여 로그아웃 할 수 있는 방식 채택.
    // 문제 - Redis에 의존? Key-Value. InMemory DB. TTL 부여가능
    // 대안 - Cookie 에 AccessToken만 설정, 로그아웃 시 쿠키 삭제?
  }
}
