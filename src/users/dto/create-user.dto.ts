import { Date } from 'mongoose';
import { Role, USER_TASK } from '../schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: '사용자의 이메일(계정)',
    example: 'John@test.com',
    required: true,
  })
  readonly email: string;

  @ApiProperty({
    description: '사용자 비밀번호',
    required: true,
  })
  readonly password: string;

  @ApiProperty({
    description: '사용자 이름',
    example: '홍길동',
    required: true,
  })
  readonly name: string;

  @ApiProperty({
    description: '전화번호',
    example: '010-1111-2222',
    nullable: true,
  })
  readonly phoneNumber: string;

  @ApiProperty({
    description: '프로필 이미지 링크',
    example: 'https://img-url.storage/img.png',
    nullable: true,
  })
  readonly image: string;

  @ApiProperty({
    description: '사용자-작업',
    enum: USER_TASK,
    required: true,
  })
  readonly task: USER_TASK;

  @ApiProperty({
    description: '사용자 권한',
    type: Object,
    example: { annotator: true, admin: false },
    required: true,
  })
  readonly role: Role;

  @ApiProperty({
    description: '약관 동의 여부',
    required: true,
    default: false,
  })
  readonly isAgreed: boolean;

  @ApiProperty({
    description: '사용자 활성화 / 비활성화',
    required: true,
    default: true,
  })
  readonly isActive: boolean;

  @ApiProperty({
    description: '누적 작업 시간 (ms)',
    default: 0,
  })
  readonly accWorked: number;

  @ApiProperty({
    description: '총 작업 task 수',
    default: 0,
  })
  readonly accTasks: number;
}
