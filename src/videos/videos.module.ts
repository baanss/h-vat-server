import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './schemas/video.schema';
import { VideosService } from './videos.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
  ],
  controllers: [],
  providers: [VideosService],
})
export class VideosModule {}
