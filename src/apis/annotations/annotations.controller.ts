import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AnnotationsService } from './annotations.service';
import { CreateAnnotationDto } from './dto/create-annotation.dto';
import {
  Annotation,
  AnnotationDocument,
} from '../../commons/schemas/annotation.schema';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('annotations')
@Controller('annotations')
export class AnnotationsController {
  constructor(
    private readonly annotationsService: AnnotationsService, //
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Annotation' })
  @ApiResponse({ status: 200, description: 'OK' })
  async create(@Body() createAnnotationDto: CreateAnnotationDto) {
    await this.annotationsService.create(createAnnotationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch Annotations' })
  @ApiResponse({
    status: 200,
    description: 'Fetch All Annotations',
    type: [Annotation],
  })
  async findAll(): Promise<Annotation[]> {
    return this.annotationsService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: `Annotation's '_id' Value(to Fetch)`,
  })
  @ApiOperation({ summary: 'Fetch Annotation by _id' })
  @ApiResponse({
    status: 200,
    description: 'Fetch One Annotation',
    type: Annotation,
  })
  async findOne(@Param('id') id: string): Promise<AnnotationDocument> {
    return this.annotationsService.findOne(id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: `Annotation's '_id' Value(to Delete)`,
  })
  @ApiOperation({ summary: 'Delete Annotation by _id' })
  @ApiResponse({
    status: 200,
    description: 'Delete One Annotation',
    type: Annotation,
  })
  async delete(@Param('id') id: string) {
    return this.annotationsService.delete(id);
  }
}
