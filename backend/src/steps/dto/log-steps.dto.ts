import { IsDateString, IsInt, IsOptional, Max, Min } from 'class-validator';

export class LogStepsDto {
  @IsInt()
  @Min(0)
  @Max(200000)
  steps: number;

  /** Optional YYYY-MM-DD; defaults to today when omitted. */
  @IsOptional()
  @IsDateString()
  date?: string;
}
