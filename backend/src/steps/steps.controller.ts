import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { MembershipGuard } from '../common/guards/membership.guard';
import { User } from '../users/user.entity';
import { LogStepsDto } from './dto/log-steps.dto';
import { StepsService } from './steps.service';

@UseGuards(JwtAuthGuard, MembershipGuard)
@Controller('steps')
export class StepsController {
  constructor(private readonly steps: StepsService) {}

  @Post()
  log(@CurrentUser() user: User, @Body() dto: LogStepsDto) {
    return this.steps.logSteps(user.id, dto);
  }

  @Get()
  history(@CurrentUser() user: User) {
    return this.steps.getHistory(user.id);
  }

  @Get('summary')
  summary(@CurrentUser() user: User) {
    return this.steps.getSummary(user.id);
  }
}
