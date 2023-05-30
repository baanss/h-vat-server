import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, SchemaTypes, Types } from 'mongoose';

export enum ANNOTATION_TYPES {
  ARMS = 'ARMES',
  ONLY_ARMES = 'ONLY_ARMES',
  ACTIVE_BLEEDING_AN = 'ACTIVE_BLEEDING_AN',
  ACTIVE_BLEEDING_IN = 'ACTIVE_BLEEDING_IN',
  BLOOD_COLLECTED = 'BLOOD_COLLECTED',
  BLOOD_STAINED_TISSUE = 'BLOOD_STAINED_TISSUE',
  INTERVENTION_AB = 'INTERVENTION_AB',
  INTERVENTION_IV = 'INTERVENTION_IV',
  AI_EMPOWERED = 'AI_EMPOWERED',
  ORGAN = 'ORGAN',
  HSDB_SELECTION = 'HSDB_SELECTION',
  GRADING = 'GRADING',
  AB_FRAME_AB = 'AB_FRAME_AB',
  AB_FRAME_FRAME = 'AB_FRAME_FRAME',
  FRAME_SELECTION = 'FRAME_SELECTION',
  CHOLEC_PHASE = 'CHOLEC_PHASE',
  CHOLEC_SKILL_ASSESSMENT = 'CHOLEC_SKILL_ASSESSMENT',
  GASTRECTOMY_GOALS = 'GASTRECTOMY_GOALS',
  GASTRECTOMY_GEARS = 'GASTRECTOMY_GEARS',
  PRESENCE = 'PRESENCE', //기존 presence 작업
  INSTRUMENTS_PRESENCE = 'INSTRUMENTS_PRESENCE',
  ORGAN_PRESENCE = 'ORGAN_PRESENCE',
}

@Schema({ timestamps: true })
export class Annotation {
  @Prop({ type: String, enum: ANNOTATION_TYPES })
  @ApiProperty({
    description: 'Annotation Types',
    enum: ANNOTATION_TYPES,
    required: true,
  })
  type: ANNOTATION_TYPES;

  @Prop({ type: SchemaTypes.Mixed })
  @ApiProperty({
    description: 'Array List of Annotation Object',
    default: [],
    required: true,
  })
  data: object[];
}

export type AnnotationDocument = Annotation & Document;

export const AnnotationSchema = SchemaFactory.createForClass(Annotation);
