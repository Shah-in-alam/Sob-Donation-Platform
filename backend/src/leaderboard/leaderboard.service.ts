import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { STEPS_PER_KM } from '../steps/steps.service';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  clubName: string | null;
  totalSteps: number;
  totalKm: number;
}

export interface LeaderboardResponse {
  top: LeaderboardEntry[];
  me: LeaderboardEntry | null;
}

interface RawRow {
  userId: string;
  name: string;
  clubName: string | null;
  totalSteps: string;
}

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  /** Individual ranking by total kilometres (top 100 + the caller's rank). */
  async individual(currentUserId: string): Promise<LeaderboardResponse> {
    const rows = await this.users
      .createQueryBuilder('u')
      .leftJoin('step_entries', 'se', 'se.user_id = u.id')
      .leftJoin('clubs', 'c', 'c.id = u.favorite_club_id')
      .select('u.id', 'userId')
      .addSelect('u.name', 'name')
      .addSelect('c.name', 'clubName')
      .addSelect('COALESCE(SUM(se.steps), 0)', 'totalSteps')
      .groupBy('u.id')
      .addGroupBy('c.name')
      .orderBy('COALESCE(SUM(se.steps), 0)', 'DESC')
      .getRawMany<RawRow>();

    const ranked: LeaderboardEntry[] = rows.map((row, index) => {
      const totalSteps = Number(row.totalSteps);
      return {
        rank: index + 1,
        userId: row.userId,
        name: row.name,
        clubName: row.clubName ?? null,
        totalSteps,
        totalKm: Math.round((totalSteps / STEPS_PER_KM) * 10) / 10,
      };
    });

    return {
      top: ranked.slice(0, 100),
      me: ranked.find((entry) => entry.userId === currentUserId) ?? null,
    };
  }
}
