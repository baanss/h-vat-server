import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
// import { HydratedDocument } from 'mongoose';
// export type VideoDocument = HydratedDocument<Video>;

@Schema()
export class Video {
  @Prop({ type: String, required: true })
  @ApiProperty({
    description: 'Index Code (Anonymize Code)',
    example: 'R0000313',
    required: true,
  })
  indexCode: string;

  @Prop({ type: String, required: true, unique: true })
  @ApiProperty({
    description: 'Video Path',
    example: '/ANT/R000001/ch1_video_01.mp4',
    uniqueItems: true,
    required: true,
  })
  path: string;

  @Prop({ type: Number, required: true })
  @ApiProperty({
    description: 'Total Frame of Video',
    example: 404243,
    required: true,
  })
  totalFrame: number;

  @Prop({ type: Number, required: true })
  @ApiProperty({
    description: 'Frame Rate',
    required: true,
  })
  frameRate: number;

  @Prop({ type: Number, required: true })
  @ApiProperty({
    description: 'Width of Video',
    example: 1280,
    required: true,
  })
  width: number;

  @Prop({ type: Number, required: true })
  @ApiProperty({
    description: 'Height of Video',
    example: 1024,
    required: true,
  })
  height: number;

  @Prop({ type: String, required: false })
  @ApiProperty({
    description: 'DataSet of Video',
  })
  dataSet: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);

// import mongoose from 'mongoose';

// export const VideoSchema = new mongoose.Schema({
//   indexCode: String,
//   path: String,
//   totalFrame: Number,
//   width: Number,
//   height: Number,
// });
