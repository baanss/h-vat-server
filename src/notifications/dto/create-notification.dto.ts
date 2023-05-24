import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'Corresponding Task Id',
    example: '646b2e6455814c2c3f6eca83',
    required: true,
  })
  readonly taskId: Types.ObjectId;

  @ApiProperty({
    description: 'Notificartion From User ID',
    example: '646b2e6455814c2c3f6eca83',
    required: true,
  })
  readonly senderId: Types.ObjectId;

  @ApiProperty({
    description: 'Notification To User ID',
    example: '646b2e6455814c2c3f6eca83',
    required: true,
  })
  readonly receiverId: Types.ObjectId;

  @ApiProperty({
    description: 'Notification Message',
    example: 'R000001에 대한 PHASE작업이 할당되었습니다.',
    required: true,
  })
  readonly message: string;
}
