import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import { UsersService } from '../users/users.service';
import { UserDocument } from 'src/commons/schemas/user.schema';

@Injectable()
export class AuthsService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly usersService: UsersService,
  ) {}

  async setRefreshToken(user: UserDocument, response: Response): Promise<void> {
    const userInfo = await this.usersService.findOne(user.id);

    const secret: string = userInfo.role.admin
      ? 'adminRefreshSecret'
      : 'userRefreshSecret'; // TODO: envConfig 분리 필요

    const refreshToken = this.jwtService.sign(
      { email: user.email, id: user.id },
      { secret, expiresIn: '2w' },
    );

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 2 * 7 * 24 * 60 * 60 * 1000, // 2주 동안 유효한 쿠키
      // TODO: Production Level에서 설정 필요 (with SSL)
      // secure: true,
      // sameSite: 'lax',
    });

    // NOTE: reponse.end 혹은 send 등의 완료처리가 되지 않으면
    // API 요청이 마무리되지 않음 - 마무리를 위해 아래와 같은 코드를 사용할 수도 있다.
    // response.end();
  }

  async getAccessToken(user: UserDocument): Promise<string> {
    const userInfo = await this.usersService.findOne(user.id);

    const secret: string = userInfo.role.admin
      ? 'adminAccessSecret'
      : 'userAccessSecret'; // TODO: envConfig 분리 필요

    const accessToken = this.jwtService.sign(
      { email: user.email, id: user.id },
      { secret, expiresIn: '1h' }, // TODO: NEED TO CHANGE
    );
    return accessToken;
  }
}
