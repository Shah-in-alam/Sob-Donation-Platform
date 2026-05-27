import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { LogStepsDto } from './dto/log-steps.dto';
import { StepEntry, StepSource } from './step-entry.entity';

/** 1 kilometre is approximately 1,250 steps (per the product spec). */
export const STEPS_PER_KM = 1250;

export interface StepSummary {
  totalSteps: number;
  totalKm: number;
  daysLogged: number;
  currentStreak: number;
  longestStreak: number;
}

function toKm(steps: number): number {
  return Math.round((steps / STEPS_PER_KM) * 10) / 10;
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDays(dateStr: string, delta: number): string {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0, 10);
}

@Injectable()
export class StepsService {
  constructor(
    @InjectRepository(StepEntry)
    private readonly steps: Repository<StepEntry>,
  ) {}

  /** Create or overwrite the entry for a given day (one entry per user/day). */
  async logSteps(userId: string, dto: LogStepsDto): Promise<StepEntry> {
    const date = dto.date ?? todayStr();
    const existing = await this.steps.findOne({
      where: { user: { id: userId }, date },
    });
    if (existing) {
      existing.steps = dto.steps;
      return this.steps.save(existing);
    }
    const entry = this.steps.create({
      user: { id: userId } as User,
      date,
      steps: dto.steps,
      source: StepSource.MANUAL,
    });
    return this.steps.save(entry);
  }

  getHistory(userId: string, limit = 30): Promise<StepEntry[]> {
    return this.steps.find({
      where: { user: { id: userId } },
      order: { date: 'DESC' },
      take: limit,
    });
  }

  async getSummary(userId: string): Promise<StepSummary> {
    const entries = await this.steps.find({
      where: { user: { id: userId } },
      order: { date: 'DESC' },
    });

    const totalSteps = entries.reduce((sum, e) => sum + e.steps, 0);
    const dates = new Set(entries.map((e) => e.date));

    return {
      totalSteps,
      totalKm: toKm(totalSteps),
      daysLogged: entries.length,
      currentStreak: this.currentStreak(dates),
      longestStreak: this.longestStreak(dates),
    };
  }

  /** Consecutive days ending today (or yesterday, if today isn't logged yet). */
  private currentStreak(dates: Set<string>): number {
    if (dates.size === 0) {
      return 0;
    }
    let cursor = todayStr();
    if (!dates.has(cursor)) {
      cursor = addDays(cursor, -1);
      if (!dates.has(cursor)) {
        return 0;
      }
    }
    let streak = 0;
    while (dates.has(cursor)) {
      streak += 1;
      cursor = addDays(cursor, -1);
    }
    return streak;
  }

  private longestStreak(dates: Set<string>): number {
    if (dates.size === 0) {
      return 0;
    }
    const sorted = [...dates].sort();
    let longest = 1;
    let run = 1;
    for (let i = 1; i < sorted.length; i++) {
      if (addDays(sorted[i - 1], 1) === sorted[i]) {
        run += 1;
        longest = Math.max(longest, run);
      } else {
        run = 1;
      }
    }
    return longest;
  }
}
