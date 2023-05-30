import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../commons/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserDocument> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findOneByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async delete(id: string) {
    const deletedUser = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedUser;
  }
}
