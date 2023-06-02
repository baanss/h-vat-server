import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AdminRefreshAuthGuard } from './admin-refresh-auth.guard';
import { UserRefreshAuthGuard } from './user-refresh-auth.guard';

@Injectable()
export class RefreshGuard implements CanActivate {
  private authGuards: CanActivate[];

  constructor() {
    this.authGuards = [new AdminRefreshAuthGuard(), new UserRefreshAuthGuard()];
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    for (const guard of this.authGuards) {
      if (await guard.canActivate(context)) {
        return true; // 하나의 AuthGuard라도 통과하면 요청 허용
      }
    }
    return false; // 모든 AuthGuard가 통과하지 않으면 요청 거부
  }
}
