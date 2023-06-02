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
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

import { RequestWithUser } from 'src/commons/interfaces/request-with-user.interface';

import { User, UserDocument } from 'src/commons/schemas/user.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthsService } from './auths.service';
import { UsersService } from '../users/users.service';

import { AccessGuard } from 'src/commons/guards/access.guard';
import { RefreshGuard } from 'src/commons/guards/refresh.guard';

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
  @UseGuards(AccessGuard)
  async fetchLoginUser(@Req() request: Request): Promise<UserDocument> {
    const userRequest: RequestWithUser = request;
    return await this.usersService.findOne(userRequest.user.id);
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

    await this.authsService.setRefreshToken(userInfo, response);
    const result = await this.authsService.getAccessToken(userInfo);

    response.status(200).send(result);
  }

  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout User' })
  @UseGuards(AccessGuard)
  async userLogout(): Promise<void> {
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
  @UseGuards(RefreshGuard)
  async restoreUserAccessToken(@Req() request: Request): Promise<string> {
    const userRequest: RequestWithUser = request;
    const userInfo = await this.usersService.findOne(userRequest.user.id);

    const result = await this.authsService.getAccessToken(userInfo);
    return result;
  }
}
