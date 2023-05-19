import { Date } from 'mongoose';
import { Role, USER_TASK } from '../schemas/user.schema';

export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly name: string;
  readonly phoneNumber: string;
  readonly image: string;
  readonly task: USER_TASK;
  readonly role: Role;
  readonly isAgreed: boolean;
  readonly isActive: boolean;
  readonly accWorked: number;
  readonly accTasks: number;
  readonly lastLogin: Date;
}
