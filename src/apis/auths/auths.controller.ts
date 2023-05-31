import {
  Body,
  Controller,
  Post,
  Res,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthsService } from './auths.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@ApiTags('auths')
@Controller('auths')
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService, //
    private readonly usersService: UsersService,
  ) {}

  @Post('/users/login')
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
}
