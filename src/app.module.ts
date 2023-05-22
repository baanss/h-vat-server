import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideosModule } from './videos/videos.module';
import { UsersModule } from './users/users.module';
import { VideoTasksModule } from './videoTasks/videoTasks.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AnnotationsModule } from './annotations/annotations.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/hvat'), //
    AnnotationsModule,
    NotificationsModule,
    UsersModule,
    VideosModule,
    VideoTasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
