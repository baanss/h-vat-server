import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminRefreshAuthGuard extends AuthGuard('adminRefresh') {}
