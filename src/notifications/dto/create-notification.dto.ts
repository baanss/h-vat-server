import { Types } from 'mongoose';

export class CreateNotificationDto {
  readonly taskId: Types.ObjectId;
  readonly senderId: Types.ObjectId;
  readonly receiverId: Types.ObjectId;
  readonly message: string;
}
