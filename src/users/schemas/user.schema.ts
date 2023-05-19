import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  password: number;

  @Prop()
  name: string;

  @Prop({ nullable: true })
  phoneNumber: string;

  @Prop({ nullable: true })
  image: string;

  @Prop()
  task: USER_TASK;

  @Prop()
  role: Role;

  @Prop({ default: false })
  isAgreed: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  accWorked: number;

  @Prop({ default: 0 })
  accTasks: number;

  @Prop({ nullable: true })
  lastLogin: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

export enum USER_TASK {
  VIDEO = 'VIDEO',
  RUS = 'RUS',
}

export type Role = {
  annotator: boolean;
  inspector: boolean;
  admin: boolean;
};
