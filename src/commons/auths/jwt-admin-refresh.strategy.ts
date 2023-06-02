import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtAdminRefreshStrategy extends PassportStrategy(
  Strategy,
  'adminRefresh',
) {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: 'adminRefreshSecret', // TODO : envConfig 분리
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    // TODO: add validate Logic
    // 로그아웃 체크 등
    // console.log('req : ', req);
    // console.log('payload : ', payload);

    return {
      email: payload.email,
      id: payload.id,
    };
  }
}
