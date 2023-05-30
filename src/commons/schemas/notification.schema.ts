import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Date, Document, SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'VideoTask', required: true })
  @ApiProperty({
    description: 'Corresponding Task Id',
    example: '646b2e6455814c2c3f6eca83',
    required: true,
  })
  taskId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  @ApiProperty({
    description: 'Notificartion From User ID',
    example: '646b2e6455814c2c3f6eca83',
    required: true,
  })
  senderId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  @ApiProperty({
    description: 'Notification To User ID',
    example: '646b2e6455814c2c3f6eca83',
    required: true,
  })
  receiverId: Types.ObjectId;

  @Prop({ type: String })
  @ApiProperty({
    description: 'Notification Message',
    example: 'R000001에 대한 PHASE작업이 할당되었습니다.',
    required: true,
  })
  message: string;

  @Prop({ type: Date, default: '1970-01-01' })
  @ApiProperty({
    description: 'notification read timestamp',
    default: '1970-01-01',
    required: true,
  })
  readAt: Date;
}

export type NotificationDocument = Notification & Document;

export const NotificationSchema = SchemaFactory.createForClass(Notification);
