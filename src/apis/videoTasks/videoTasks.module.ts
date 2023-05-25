import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  VideoTask,
  VideoTaskSchema,
} from '../../commons/schemas/videoTask.schema';
import { VideoTasksController } from './videoTasks.controller';
import { VideoTasksService } from './videoTasks.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VideoTask.name, schema: VideoTaskSchema },
    ]),
  ],
  controllers: [VideoTasksController],
  providers: [VideoTasksService],
})
export class VideoTasksModule {}
