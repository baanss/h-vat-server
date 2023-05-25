import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { Video } from '../../commons/schemas/video.schema';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('videos')
@Controller('videos')
export class VideosController {
  constructor(
    private readonly videosService: VideosService, //
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Video' })
  @ApiResponse({ status: 200, description: 'OK' })
  async create(@Body() createVideoDto: CreateVideoDto) {
    await this.videosService.create(createVideoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch Videos' })
  @ApiResponse({ status: 200, description: 'Fetch All Videos', type: [Video] })
  async findAll(): Promise<Video[]> {
    return this.videosService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: `Video '_id' value (to Fetch)`,
  })
  @ApiOperation({ summary: 'Fetch Video by _id' })
  @ApiResponse({ status: 200, description: 'Fetch One Video', type: Video })
  async findOne(@Param('id') id: string): Promise<Video> {
    return this.videosService.findOne(id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: `Video '_id' value (to Delete)`,
  })
  @ApiOperation({ summary: 'Delete Video by _id' })
  @ApiResponse({ status: 200, description: 'Delete One Video', type: Video })
  async delete(@Param('id') id: string) {
    return this.videosService.delete(id);
  }
}
