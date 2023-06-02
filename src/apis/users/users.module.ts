import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../commons/schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtAdminAccessStrategy } from 'src/commons/auths/jwt-admin-access.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    JwtAdminAccessStrategy, //
    UsersService,
  ],
})
export class UsersModule {}
