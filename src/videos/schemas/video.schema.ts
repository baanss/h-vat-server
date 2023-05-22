import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { HydratedDocument } from 'mongoose';

// export type VideoDocument = HydratedDocument<Video>;

@Schema()
export class Video {
  @Prop({ type: String, required: true })
  indexCode: string;

  @Prop({ type: String, required: true, unique: true })
  path: string;

  @Prop({ type: Number, required: true })
  totalFrame: number;

  @Prop({ type: Number, required: true })
  frameRate: number;

  @Prop({ type: Number, required: true })
  width: number;

  @Prop({ type: Number, required: true })
  height: number;

  @Prop({ type: String, required: false })
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
