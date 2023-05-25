import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Annotation,
  AnnotationSchema,
} from '../../commons/schemas/annotation.schema';
import { AnnotationsController } from './annotations.controller';
import { AnnotationsService } from './annotations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Annotation.name, schema: AnnotationSchema },
    ]),
  ],
  controllers: [AnnotationsController],
  providers: [AnnotationsService],
})
export class AnnotationsModule {}
