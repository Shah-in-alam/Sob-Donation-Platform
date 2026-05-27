import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StepEntry } from './step-entry.entity';
import { StepsController } from './steps.controller';
import { StepsService } from './steps.service';

@Module({
  imports: [TypeOrmModule.forFeature([StepEntry])],
  providers: [StepsService],
  controllers: [StepsController],
})
export class StepsModule {}
