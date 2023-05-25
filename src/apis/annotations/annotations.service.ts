import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Annotation } from '../../commons/schemas/annotation.schema';
import { Model } from 'mongoose';
import { CreateAnnotationDto } from './dto/create-annotation.dto';

@Injectable()
export class AnnotationsService {
  constructor(
    @InjectModel(Annotation.name)
    private readonly annotationModel: Model<Annotation>,
  ) {}

  async create(createAnnotationDto: CreateAnnotationDto): Promise<Annotation> {
    const createdAnnotation = await this.annotationModel.create(
      createAnnotationDto,
    );
    return createdAnnotation;
  }

  async findAll(): Promise<Annotation[]> {
    return this.annotationModel.find().exec();
  }

  async findOne(id: string): Promise<Annotation> {
    return this.annotationModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedAnnotation = await this.annotationModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedAnnotation;
  }
}
