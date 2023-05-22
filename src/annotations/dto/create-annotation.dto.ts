import { ANNOTATION_TYPES } from '../schemas/annotation.schema';

export class CreateAnnotationDto {
  readonly type: ANNOTATION_TYPES;
  readonly data: object[];
}
