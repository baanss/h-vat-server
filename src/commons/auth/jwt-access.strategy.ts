import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'userAccess',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret', // TODO : envConfig 분리
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
