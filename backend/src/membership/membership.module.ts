import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { MembershipController } from './membership.controller';
import { MembershipService } from './membership.service';

@Module({
  imports: [UsersModule],
  providers: [MembershipService],
  controllers: [MembershipController],
})
export class MembershipModule {}
