import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VideoTask } from './schemas/videoTask.schema';
import { Model } from 'mongoose';
import { CreateVideoTaskDto } from './dto/create-videoTask.dto';

@Injectable()
export class VideoTasksService {
  constructor(
    @InjectModel(VideoTask.name)
    private readonly videoTaskModel: Model<VideoTask>,
  ) {}

  async create(createVideoTaskDto: CreateVideoTaskDto): Promise<VideoTask> {
    const createdVideoTask = await this.videoTaskModel.create(
      createVideoTaskDto,
    );
    return createdVideoTask;
  }

  async findAll(): Promise<VideoTask[]> {
    return this.videoTaskModel.find().exec();
  }

  async findOne(id: string): Promise<VideoTask> {
    return this.videoTaskModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedVideoTask = await this.videoTaskModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedVideoTask;
  }
}
