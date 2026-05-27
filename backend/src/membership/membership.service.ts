import { Injectable } from '@nestjs/common';
import { MembershipStatus, User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

/**
 * Interim membership service. Phase 2 will replace activate/cancel with a real
 * Stripe subscription flow (Checkout + webhooks). For now it flips the status
 * directly so the members-only features are testable.
 */
@Injectable()
export class MembershipService {
  constructor(private readonly users: UsersService) {}

  async activate(userId: string): Promise<Omit<User, 'passwordHash'>> {
    const user = await this.users.updateMembershipStatus(
      userId,
      MembershipStatus.ACTIVE,
    );
    return this.sanitize(user);
  }

  async cancel(userId: string): Promise<Omit<User, 'passwordHash'>> {
    const user = await this.users.updateMembershipStatus(
      userId,
      MembershipStatus.CANCELED,
    );
    return this.sanitize(user);
  }

  private sanitize(user: User): Omit<User, 'passwordHash'> {
    const { passwordHash: _passwordHash, ...rest } = user;
    return rest;
  }
}
