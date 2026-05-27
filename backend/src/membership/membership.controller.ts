import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { User } from '../users/user.entity';
import { MembershipService } from './membership.service';

@UseGuards(JwtAuthGuard)
@Controller('membership')
export class MembershipController {
  constructor(private readonly membership: MembershipService) {}

  @Get()
  status(@CurrentUser() user: User) {
    return { membershipStatus: user.membershipStatus };
  }

  @Post('activate')
  activate(@CurrentUser() user: User) {
    return this.membership.activate(user.id);
  }

  @Post('cancel')
  cancel(@CurrentUser() user: User) {
    return this.membership.cancel(user.id);
  }
}
