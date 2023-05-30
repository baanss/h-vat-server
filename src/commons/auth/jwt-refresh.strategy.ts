import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'userRefresh',
) {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.header.cookie;
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: 'TODO: NEED_TO_CHANGE!',
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    // TODO: add validate Logic
    // 로그아웃 체크 등
    console.log('req : ', req);
    console.log('payload : ', payload);

    return {
      email: payload.email,
      id: payload.id,
    };
  }
}
