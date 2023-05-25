import { Types } from 'mongoose';
import {
  VIDEO_TASK_STATUS,
  VIDEO_TASK_TYPE,
} from '../../../commons/schemas/videoTask.schema';
import { ANNOTATION_TYPES } from 'src/commons/schemas/annotation.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoTaskDto {
  @ApiProperty({
    description: 'Unique Task Key (userId + videoId + annotationType)',
    example:
      '646b25b5c1f74cd086210e35646b25b5c1f74cd086210e35ACTIVE_BLEEDING_AN',
    uniqueItems: true,
    required: true,
  })
  readonly taskKey: string;

  @ApiProperty({
    description: 'Video Task Type',
    enum: VIDEO_TASK_TYPE,
    required: true,
  })
  readonly taskType: VIDEO_TASK_TYPE;

  @ApiProperty({
    description: 'Video ID (Ref)',
    example: '646b2e6455814c2c3f6eca83',
    required: true,
  })
  readonly video: Types.ObjectId;

  @ApiProperty({
    description: 'User ID (Ref) - annotator',
    example: '646b2e6455814c2c3f6eca83',
    required: true,
  })
  readonly annotatorId: Types.ObjectId;

  @ApiProperty({
    description: 'User ID (Ref) - admin',
    example: '646b2e6455814c2c3f6eca83',
    required: true,
  })
  readonly managerId: Types.ObjectId;

  @ApiProperty({
    description: 'Current Status',
    enum: VIDEO_TASK_STATUS,
    required: true,
  })
  readonly status: VIDEO_TASK_STATUS;

  @ApiProperty({
    description: 'Annotation Type',
    enum: ANNOTATION_TYPES,
    required: true,
  })
  readonly annotationType: ANNOTATION_TYPES;

  @ApiProperty({
    description: 'Connected Annotation ID List',
    default: [],
    required: true,
  })
  readonly annotations: Types.ObjectId[];
}
