import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { MembershipGuard } from '../common/guards/membership.guard';
import { User } from '../users/user.entity';
import { LeaderboardService } from './leaderboard.service';

@UseGuards(JwtAuthGuard, MembershipGuard)
@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboard: LeaderboardService) {}

  @Get('individual')
  individual(@CurrentUser() user: User) {
    return this.leaderboard.individual(user.id);
  }
}
