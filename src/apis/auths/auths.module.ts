import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { AuthsController } from './auths.controller';
import { AuthsService } from './auths.service';
import { UsersService } from '../users/users.service';
import { User, UserSchema } from 'src/commons/schemas/user.schema';

import { JwtAdminAccessStrategy } from 'src/commons/auths/jwt-admin-access.strategy';
import { JwtAdminRefreshStrategy } from 'src/commons/auths/jwt-admin-refresh.strategy';
import { JwtUserAccessStrategy } from 'src/commons/auths/jwt-user-access.strategy';
import { JwtUserRefreshStrategy } from 'src/commons/auths/jwt-user-refresh.strategy';
import { AccessGuard } from 'src/commons/guards/access.guard';
import { RefreshGuard } from 'src/commons/guards/refresh.guard';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthsController],
  providers: [
    JwtAdminAccessStrategy, //
    JwtAdminRefreshStrategy,
    JwtUserAccessStrategy,
    JwtUserRefreshStrategy,
    AccessGuard,
    RefreshGuard,
    AuthsService,
    UsersService,
  ],
})
export class AuthsModule {}
