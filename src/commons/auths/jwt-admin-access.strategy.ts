import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/apis/users/users.service';

export class JwtAdminAccessStrategy extends PassportStrategy(
  Strategy,
  'adminAccess',
) {
  constructor(
    private readonly usersService: UsersService, //
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'adminAccessSecret', // TODO : envConfig 분리
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
