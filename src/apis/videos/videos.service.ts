import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Video } from '../../commons/schemas/video.schema';
import { Model } from 'mongoose';
import { CreateVideoDto } from './dto/create-video.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<Video>,
  ) {}

  async create(createVideoDto: CreateVideoDto): Promise<Video> {
    const createdVideo = await this.videoModel.create(createVideoDto);
    return createdVideo;
  }

  async findAll(): Promise<Video[]> {
    return this.videoModel.find().exec();
  }

  async findOne(id: string): Promise<Video> {
    return this.videoModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedVideo = await this.videoModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedVideo;
  }
}
