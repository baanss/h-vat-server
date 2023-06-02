import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminAccessAuthGuard extends AuthGuard('adminAccess') {}
