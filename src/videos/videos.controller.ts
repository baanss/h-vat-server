import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { Video } from './schemas/video.schema';

@Controller('videos')
export class VideosController {
  constructor(
    private readonly videosService: VideosService, //
  ) {}

  @Post()
  async create(@Body() createVideoDto: CreateVideoDto) {
    await this.videosService.create(createVideoDto);
  }

  @Get()
  async findAll(): Promise<Video[]> {
    return this.videosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Video> {
    return this.videosService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.videosService.delete(id);
  }
}
