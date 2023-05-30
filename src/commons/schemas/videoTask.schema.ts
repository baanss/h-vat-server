import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { ANNOTATION_TYPES } from 'src/commons/schemas/annotation.schema';
import { ApiProperty } from '@nestjs/swagger';

export enum VIDEO_TASK_TYPE {
  ANNOTATION = 'ANNOTATION',
  INSPECTION = 'INSPECTION',
}

export enum VIDEO_TASK_STATUS {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Schema({ timestamps: true })
export class VideoTask {
  @Prop({ type: String, unique: true, index: true, required: true })
  @ApiProperty({
    description: 'Unique Task Key (userId + videoId + annotationType)',
    example:
      '646b25b5c1f74cd086210e35646b25b5c1f74cd086210e35ACTIVE_BLEEDING_AN',
    uniqueItems: true,
    required: true,
  })
  taskKey: string;

  @Prop({ type: String, enum: VIDEO_TASK_TYPE, required: true })
  @ApiProperty({
    description: 'Video Task Type',
    enum: VIDEO_TASK_TYPE,
    required: true,
  })
  taskType: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Video', required: true })
  @ApiProperty({
    description: 'Video ID (Ref)',
    example: '646b2e6455814c2c3f6eca83',
    required: true,
  })
  video: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  @ApiProperty({
    description: 'User ID (Ref) - annotator',
    example: '646b2e6455814c2c3f6eca83',
    required: true,
  })
  annotatorId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  @ApiProperty({
    description: 'User ID (Ref) - admin',
    example: '646b2e6455814c2c3f6eca83',
    required: true,
  })
  managerId: Types.ObjectId;

  @Prop({
    type: String,
    enum: VIDEO_TASK_STATUS,
    required: true,
    default: VIDEO_TASK_STATUS.NOT_STARTED,
  })
  @ApiProperty({
    description: 'Current Status',
    enum: VIDEO_TASK_STATUS,
    required: true,
  })
  status: string;

  @Prop({ type: String, enum: ANNOTATION_TYPES, required: true })
  @ApiProperty({
    description: 'Annotation Type',
    enum: ANNOTATION_TYPES,
    required: true,
  })
  annotationType: string;

  @Prop({ type: Boolean, default: true })
  @ApiProperty({
    description: 'Active Data Can Fetch ONLY.',
    default: true,
    required: true,
  })
  isActive: boolean;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Annotation' })
  @ApiProperty({
    description: 'Connected Annotation ID List',
    default: [],
    required: true,
  })
  annotations: Types.ObjectId[];
}

export type VideoTaskDocument = VideoTask & Document;

export const VideoTaskSchema = SchemaFactory.createForClass(VideoTask);
