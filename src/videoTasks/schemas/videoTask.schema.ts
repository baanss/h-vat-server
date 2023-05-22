import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { ANNOTATION_TYPES } from 'src/annotations/schemas/annotation.schema';

export enum VIDEO_TASK_TYPE {
  ANNOTATION = 'ANNOTATION',
  INSPECTION = 'INSPECTION',
}

export enum VIDEO_TASK_STATUS {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Schema()
export class VideoTask {
  @Prop({
    type: String,
    unique: true,
    index: true,
    required: true,
  })
  taskKey: string;

  @Prop({
    type: String,
    enum: VIDEO_TASK_TYPE,
    required: true,
  })
  taskType: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Video',
    required: true,
  })
  video: Types.ObjectId;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  annotatorId: Types.ObjectId;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  managerId: Types.ObjectId;

  @Prop({
    type: String,
    enum: VIDEO_TASK_STATUS,
    required: true,
    default: VIDEO_TASK_STATUS.NOT_STARTED,
  })
  status: string;

  @Prop({
    type: String,
    enum: ANNOTATION_TYPES,
    required: true,
  })
  annotationType: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Annotation',
  })
  annotations: Types.ObjectId[];
}

export const VideoTaskSchema = SchemaFactory.createForClass(VideoTask);
