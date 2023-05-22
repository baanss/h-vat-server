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
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop({ nullable: true })
  phoneNumber: string;

  @Prop({ nullable: true })
  image: string;

  @Prop({ type: String, enum: USER_TASK })
  task: USER_TASK;

  @Prop({ type: Object })
  role: Role;

  @Prop({ default: false })
  isAgreed: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  accWorked: number;

  @Prop({ default: 0 })
  accTasks: number;

  @Prop({ type: Date, nullable: true })
  lastLogin: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
