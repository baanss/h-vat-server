import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { VideoTasksService } from './videoTasks.service';
import { CreateVideoTaskDto } from './dto/create-videoTask.dto';
import { VideoTask } from './schemas/videoTask.schema';

@Controller('video-tasks')
export class VideoTasksController {
  constructor(
    private readonly videoTasksService: VideoTasksService, //
  ) {}

  @Post()
  async create(@Body() createVideoTaskDto: CreateVideoTaskDto) {
    await this.videoTasksService.create(createVideoTaskDto);
  }

  @Get()
  async findAll(): Promise<VideoTask[]> {
    return this.videoTasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<VideoTask> {
    return this.videoTasksService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.videoTasksService.delete(id);
  }
}
