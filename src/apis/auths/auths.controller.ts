import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  ServiceUnavailableException,
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
import { IUserTokenInfo } from 'src/commons/interfaces/user-token-info.interface';
import { IRequest } from 'src/commons/interfaces/http-message.interface';
import { User } from 'src/commons/schemas/user.schema';

@ApiTags('auths')
@Controller('auths')
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService, //
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'check Login User' })
  @ApiResponse({
    status: 200,
    description: "Login User's Info",
    type: User,
  })
  @UseGuards(AuthGuard('userAccess'))
  async fetchLoginUser(@Req() request: Request) {
    const userRequest: IRequest = { request };
    const userToken: IUserTokenInfo = {
      email: userRequest.request.user.email,
      id: userRequest.request.user.id,
    };
    return await this.usersService.findOne(userToken.id);
  }

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

    const userToken: IUserTokenInfo = {
      email: userInfo.email,
      id: userInfo.id,
    };
    this.authsService.setRefreshToken(userToken, response);
    const result = await this.authsService.getAccessToken(userToken);

    response.status(200).send(result);
  }

  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout User' })
  @UseGuards(AuthGuard('userAccess'))
  async userLogout() {
    // @Req() request: Request
    throw new ServiceUnavailableException('로그아웃 기능은 현재 준비중입니다.');
    // TODO: Logout 방식을 설정하여 구현 필요
    // 현재 - AccessToken, RefreshToken을 함께 발급하여
    // Logout시 두 Token을 BlackList 설정하여 로그아웃 할 수 있는 방식 채택.
    // 문제 - Redis에 의존? Key-Value. InMemory DB. TTL 부여가능
    // 대안 - Cookie 에 AccessToken만 설정, 로그아웃 시 쿠키 삭제?
  }

  @Post('restore-token')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Restore AccessToken' })
  @ApiResponse({
    status: 200,
    description: 'Restored Access Token',
    type: String,
  })
  @UseGuards(AuthGuard('userRefresh'))
  async restoreUserAccessToken(@Req() request: Request) {
    const userRequest: IRequest = { request };
    const userToken: IUserTokenInfo = {
      email: userRequest.request.user.email,
      id: userRequest.request.user.id,
    };
    const result = await this.authsService.getAccessToken(userToken);

    return result;
  }
}
