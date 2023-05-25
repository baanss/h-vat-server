import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideosModule } from './videos/videos.module';
import { UsersModule } from './users/users.module';
import { VideoTasksModule } from './videoTasks/videoTasks.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AnnotationsModule } from './annotations/annotations.module';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/hvat'), //
    AnnotationsModule,
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
