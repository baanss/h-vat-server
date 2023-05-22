import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';

export enum USER_TASK {
  VIDEO = 'VIDEO',
  RUS = 'RUS',
}

export type Role = {
  annotator: boolean;
  inspector: boolean;
  admin: boolean;
};

@Schema()
export class User {
  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Prop({ type: String, trim: true, required: true })
  password: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ nullable: true })
  phoneNumber: string;

  @Prop({ nullable: true })
  image: string;

  @Prop({ type: String, enum: USER_TASK, required: true })
  task: USER_TASK;

  @Prop({
    type: Object,
    validate: {
      validator: validateRole,
      message: 'Invalid user role',
    },
    required: true,
  })
  role: Role;

  @Prop({ type: Boolean, required: true, default: false })
  isAgreed: boolean;

  @Prop({ type: Boolean, required: true, default: true })
  isActive: boolean;

  @Prop({ type: Number, default: 0 })
  accWorked: number;

  @Prop({ type: Number, default: 0 })
  accTasks: number;

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

export const UserSchema = SchemaFactory.createForClass(User);
