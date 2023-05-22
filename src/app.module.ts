import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideosModule } from './videos/videos.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/hvat'), //
    UsersModule,
    VideosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
