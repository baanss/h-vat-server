import { Request } from 'express';

export interface IUser {
  user?: {
    id?: string;
    email?: string;
  };
  headers?: {
    authorization?: string;
    cookie?: string;
  };
}

export interface IRequest {
  request?: Request & IUser;
}
