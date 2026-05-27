import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { MembershipStatus, User } from '../../users/user.entity';

/**
 * Allows the request only when the authenticated user has an active membership.
 * Must run after JwtAuthGuard (which populates request.user).
 */
@Injectable()
export class MembershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user?: User }>();
    const user = request.user;
    if (!user || user.membershipStatus !== MembershipStatus.ACTIVE) {
      throw new ForbiddenException('Active membership required');
    }
    return true;
  }
}
