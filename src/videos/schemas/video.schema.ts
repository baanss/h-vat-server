import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VideoDocument = HydratedDocument<Video>;

@Schema()
export class Video {
  @Prop()
  indexCode: string;

  @Prop()
  path: string;

  @Prop()
  totalFrame: number;

  @Prop()
  width: number;

  @Prop()
  height: number;
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
