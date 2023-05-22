import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, SchemaTypes, Types } from 'mongoose';

@Schema()
export class Notification {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'VideoTask', required: true })
  taskId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  senderId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  receiverId: Types.ObjectId;

  @Prop({ type: String })
  message: string;

  @Prop({ type: Date, default: '1970-01-01' })
  readAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
