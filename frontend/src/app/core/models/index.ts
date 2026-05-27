export type MembershipStatus = 'inactive' | 'active' | 'canceled';

export interface Club {
  id: string;
  name: string;
  region?: string | null;
}

export interface User {
  id: string;
  email: string;
  name: string;
  favoriteClub: Club | null;
  membershipStatus: MembershipStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  favoriteClubId?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export type StepSource = 'manual' | 'apple_health' | 'google_fit';

export interface StepEntry {
  id: string;
  date: string;
  steps: number;
  source: StepSource;
  createdAt: string;
}

export interface StepSummary {
  totalSteps: number;
  totalKm: number;
  daysLogged: number;
  currentStreak: number;
  longestStreak: number;
}

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
