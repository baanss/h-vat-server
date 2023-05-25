import { ApiProperty } from '@nestjs/swagger';
import { ANNOTATION_TYPES } from '../schemas/annotation.schema';

export class CreateAnnotationDto {
  @ApiProperty({
    description: 'Annotation Types',
    enum: ANNOTATION_TYPES,
    required: true,
  })
  readonly type: ANNOTATION_TYPES;

  @ApiProperty({
    description: 'Array List of Annotation Object',
    default: [],
    required: true,
  })
  readonly data: object[];
}
