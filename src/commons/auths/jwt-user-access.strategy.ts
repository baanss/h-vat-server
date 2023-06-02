import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtUserAccessStrategy extends PassportStrategy(
  Strategy,
  'userAccess',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_USER_ACCESS_SECRET,
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
