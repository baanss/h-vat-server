import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtUserRefreshStrategy extends PassportStrategy(
  Strategy,
  'userRefresh',
) {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: process.env.JWT_USER_REFRESH_SECRET,
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
