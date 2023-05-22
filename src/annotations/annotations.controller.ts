import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AnnotationsService } from './annotations.service';
import { CreateAnnotationDto } from './dto/create-annotation.dto';
import { Annotation } from './schemas/annotation.schema';

@Controller('annotations')
export class AnnotationsController {
  constructor(
    private readonly annotationsService: AnnotationsService, //
  ) {}

  @Post()
  async create(@Body() createAnnotationDto: CreateAnnotationDto) {
    await this.annotationsService.create(createAnnotationDto);
  }

  @Get()
  async findAll(): Promise<Annotation[]> {
    return this.annotationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Annotation> {
    return this.annotationsService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.annotationsService.delete(id);
  }
}
