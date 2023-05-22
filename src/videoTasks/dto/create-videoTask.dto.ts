import { Types } from 'mongoose';
import {
  VIDEO_TASK_STATUS,
  VIDEO_TASK_TYPE,
} from '../schemas/videoTask.schema';
import { ANNOTATION_TYPES } from 'src/annotations/schemas/annotation.schema';

export class CreateVideoTaskDto {
  readonly taskKey: string;
  readonly taskType: VIDEO_TASK_TYPE;
  readonly video: Types.ObjectId;
  readonly annotatorId: Types.ObjectId;
  readonly managerId: Types.ObjectId;
  readonly status: VIDEO_TASK_STATUS;
  readonly annotationType: ANNOTATION_TYPES;
}
