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
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev'],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DATABASE_URI'),
      }),
    }),
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
