import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { VideoTasksService } from './videoTasks.service';
import { CreateVideoTaskDto } from './dto/create-videoTask.dto';
import { VideoTask } from './schemas/videoTask.schema';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('video-tasks')
@Controller('video-tasks')
export class VideoTasksController {
  constructor(
    private readonly videoTasksService: VideoTasksService, //
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Video-Task' })
  @ApiResponse({ status: 200, description: 'OK' })
  async create(@Body() createVideoTaskDto: CreateVideoTaskDto) {
    await this.videoTasksService.create(createVideoTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch Videos' })
  @ApiResponse({
    status: 200,
    description: 'Fetch All Video-tasks',
    type: [VideoTask],
  })
  async findAll(): Promise<VideoTask[]> {
    return this.videoTasksService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: `Video '_id' value (to Fetch)`,
  })
  @ApiOperation({ summary: 'Fetch Video-Task by _id' })
  @ApiResponse({
    status: 200,
    description: 'Fetch One VideoTask',
    type: VideoTask,
  })
  async findOne(@Param('id') id: string): Promise<VideoTask> {
    return this.videoTasksService.findOne(id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: `Video '_id' value (to Delete)`,
  })
  @ApiOperation({ summary: 'Delete Video-Task by _id' })
  @ApiResponse({
    status: 200,
    description: 'Delete One VideoTask',
    type: VideoTask,
  })
  async delete(@Param('id') id: string) {
    return this.videoTasksService.delete(id);
  }
}
