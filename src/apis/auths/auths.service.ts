import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/commons/schemas/user.schema';

@Injectable()
export class AuthsService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async setRefreshToken(user: UserDocument, response: Response) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, id: user.id },
      { secret: 'secret', expiresIn: '2w' }, // TODO: NEED TO CHANGE
    );

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 2 * 7 * 24 * 60 * 60 * 1000, // 2주 동안 유효한 쿠키
    });

    // API 요청의 마무리를 위해 응답 객체를 마무리
    // response.end();
  }

  async getAccessToken(user: UserDocument): Promise<string> {
    const accessToken = this.jwtService.sign(
      { email: user.email, id: user.id },
      { secret: 'secret', expiresIn: '1h' }, // TODO: NEED TO CHANGE
    );
    return accessToken;
  }
}
