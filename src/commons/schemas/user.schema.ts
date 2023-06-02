import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Date, Document } from 'mongoose';

export enum USER_TASK {
  VIDEO = 'VIDEO',
  RUS = 'RUS',
}

export type Role = {
  annotator: boolean;
  inspector?: boolean;
  admin: boolean;
};

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, unique: true, required: true })
  @ApiProperty({
    description: '사용자의 이메일(계정)',
    example: 'John@test.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: '사용자 비밀번호',
    required: true,
  })
  @Prop({ type: String, trim: true, required: true })
  password: string;

  @ApiProperty({
    description: '사용자 이름',
    example: '홍길동',
    required: true,
  })
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({
    description: '전화번호',
    example: '010-1111-2222',
    nullable: true,
  })
  @Prop({ nullable: true })
  phoneNumber: string;

  @ApiProperty({
    description: '프로필 이미지 링크',
    example: 'https://img-url.storage/img.png',
    nullable: true,
  })
  @Prop({ nullable: true })
  image: string;

  @ApiProperty({
    description: '사용자-작업',
    enum: USER_TASK,
    required: true,
  })
  @Prop({ type: String, enum: USER_TASK, required: true })
  task: USER_TASK;

  @ApiProperty({
    description: '사용자 권한',
    type: Object,
    example: { annotator: true, admin: false },
    required: true,
  })
  @Prop({
    type: Object,
    validate: {
      validator: validateRole,
      message: 'Invalid user role',
    },
    required: true,
  })
  role: Role;

  @ApiProperty({
    description: '약관 동의 여부',
    required: true,
    default: false,
  })
  @Prop({ type: Boolean, required: true, default: false })
  isAgreed: boolean;

  @ApiProperty({
    description: '사용자 활성화 / 비활성화',
    required: true,
    default: true,
  })
  @Prop({ type: Boolean, required: true, default: true })
  isActive: boolean;

  @ApiProperty({
    description: '누적 작업 시간 (ms)',
    default: 0,
  })
  @Prop({ type: Number, default: 0 })
  accWorked: number;

  @ApiProperty({
    description: '총 작업 task 수',
    default: 0,
  })
  @Prop({ type: Number, default: 0 })
  accTasks: number;

  @ApiProperty({
    description: '마지막 로그인 시각',
    example: '1970-01-01',
  })
  @Prop({ type: Date, nullable: true })
  lastLogin: Date;
}

/**
 * - role은 key값으로 "admin", "annotator"만 가질 수 있음
 * - admin은 다른 role을 가질 수 없음
 */
function validateRole(userRole: Role) {
  const roles = ['admin', 'annotator'];
  return Object.keys(userRole).every((role) => roles.includes(role));
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
