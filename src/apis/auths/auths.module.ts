import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/commons/schemas/user.schema';
import { AuthsController } from './auths.controller';
import { AuthsService } from './auths.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthsController],
  providers: [
    JwtAccessStrategy, //
    JwtRefreshStrategy,
    AuthsService,
    UsersService,
  ],
})
export class AuthsModule {}
