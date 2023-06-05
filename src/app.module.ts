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

import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

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
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        secure: false,
        auth: {
          user: process.env.MAILER_GMAIL_USER,
          pass: process.env.MAILER_GMAIL_PASS,
        },
      },
      defaults: {
        from: process.env.MAILER_GMAIL_SENDER,
      },
      template: {
        dir: __dirname + '/commons/mail-templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
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
