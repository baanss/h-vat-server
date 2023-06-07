import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../commons/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>, //
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      parseFloat(this.configService.get('PASSWORD_SALT')),
    );

    // 메일 전송
    const mailSent = await this.sendWelcomeMail({ email: createUserDto.email });
    if (!mailSent) throw new ServiceUnavailableException('메일전송 실패');

    const createdUser = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
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

  async sendWelcomeMail({ email }): Promise<boolean> {
    const pwdTemp = 'change_this!';
    const serviceUrl = this.configService.get('SERVICE_URL');

    let result = false;
    await this.mailerService
      .sendMail({
        from: 'noreply@hutom.co.kr',
        to: email,
        subject: 'h-vat 회원가입을 환영합니다.',
        html: `<h1>h-vat | Hutom Video Annotation Tool</h1>
              <h2>hutom Video Annotation Tool에 오신걸 환영합니다.</h2>
              <br>
              <span>임시 비밀번호 : ${pwdTemp}<span>
              <br>
              <span>접속 주소 : ${serviceUrl}`,
      })
      .then(() => {
        result = true;
      })
      .catch((e) => {
        result = false;
        console.log(e);
      });
    return result;
  }
}
