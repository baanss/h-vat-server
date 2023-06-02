import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './commons/middlewares/logger.middleware';

import { AnnotationsModule } from './apis/annotations/annotations.module';
import { AuthsModule } from './apis/auths/auths.module';
import { NotificationsModule } from './apis/notifications/notifications.module';
import { UsersModule } from './apis/users/users.module';
import { VideosModule } from './apis/videos/videos.module';
import { VideoTasksModule } from './apis/videoTasks/videoTasks.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/hvat'), // TODO: envConfig 설정 필요
    AnnotationsModule,
    AuthsModule,
    NotificationsModule,
    UsersModule,
    VideosModule,
    VideoTasksModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
