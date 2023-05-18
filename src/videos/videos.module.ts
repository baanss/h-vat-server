import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './schemas/video.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Video.name, schema: VideoSchema }],
      'videos',
    ),
  ],
  controllers: [],
  providers: [],
})
export class CatsModule {}
