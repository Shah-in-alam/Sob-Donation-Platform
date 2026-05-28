import { DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

export type Tab = 'news' | 'events' | 'impact';

export interface LeaderboardEntry {
  rank: number;
  name: string;
  club: string;
  km: number;
  steps: number;
  isMe?: boolean;
}

export interface ImpactMonth {
  month: string;
  amount: number;
  items: string[];
}

export interface Update {
  title: string;
  date: string;
  summary: string;
  image: string;
  tag: string;
}

export interface FutureEvent {
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [DecimalPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly auth = inject(AuthService);
  readonly user = this.auth.currentUser;

  readonly activeTab = signal<Tab>('news');
  readonly weekExpanded = signal(false);
  readonly selectedEvent = signal<FutureEvent | null>(null);

  openEvent(event: FutureEvent): void { this.selectedEvent.set(event); }
  closeEvent(): void { this.selectedEvent.set(null); }

  // ── Steps (hardcoded prototype) ──────────────────────
  readonly todaySteps = 7200;
  readonly dailyGoal = 10000;
  readonly todayKm = (7200 / 1250).toFixed(1);
  readonly progressPercent = Math.round((7200 / 10000) * 100);
  readonly streak = 3;
  readonly weeklySteps = [5400, 8100, 6200, 9300, 7200, 0, 0];
  readonly weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  readonly weekMax = 10000;
  readonly weekKm = this.weeklySteps.map(s => s > 0 ? (s / 1250).toFixed(1) : null);

  // SVG ring — r=50, circumference ≈ 314
  readonly ringCircumference = 314;
  get ringOffset(): number {
    return this.ringCircumference * (1 - this.progressPercent / 100);
  }

  // ── Leaderboard ──────────────────────────────────────
  readonly leaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'Emma V.',    club: 'Antwerp',  km: 42.3, steps: 52875 },
    { rank: 2, name: 'Lucas D.',   club: 'Brussels', km: 38.1, steps: 47625 },
    { rank: 3, name: 'Sophie M.',  club: 'Ghent',    km: 35.7, steps: 44625 },
    { rank: 4, name: 'Thomas B.',  club: 'Liège',    km: 31.2, steps: 39000 },
    { rank: 5, name: 'Marie L.',   club: 'Bruges',   km: 28.9, steps: 36125 },
    { rank: 6, name: 'Nicolas P.', club: 'Leuven',   km: 26.4, steps: 33000 },
    { rank: 7, name: 'You',        club: 'Antwerp',  km: 22.4, steps: 28000, isMe: true },
    { rank: 8, name: 'Fatima B.',  club: 'Namur',    km: 19.8, steps: 24750 },
    { rank: 9, name: 'Pieter V.',  club: 'Mechelen', km: 17.2, steps: 21500 },
    { rank: 10, name: 'Julie D.',  club: 'Hasselt',  km: 14.6, steps: 18250 },
  ];

  medalIcon(rank: number): string {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
  }

  // ── Impact ───────────────────────────────────────────
  readonly impactMonths: ImpactMonth[] = [
    {
      month: 'May 2026', amount: 10,
      items: [
        'Training equipment for 10 athletes',
        'Transport to 2 regional competitions',
        'Medal ceremonies for 48 participants',
      ],
    },
    {
      month: 'April 2026', amount: 10,
      items: [
        'Sports shoes for 6 athletes in need',
        'Venue rental for Ghent regional games',
        'Coaching workshop for 12 volunteers',
      ],
    },
    {
      month: 'March 2026', amount: 10,
      items: [
        'Team jerseys for Antwerp Athletics',
        'Healthy Athletes screening — 30 athletes',
        'Swimming gear for 8 swimmers',
      ],
    },
  ];

  readonly totalDonated = (this.impactMonths.length * 10).toFixed(0);
  readonly totalAthletes = 124;

  // ── Updates ──────────────────────────────────────────
  readonly updates: Update[] = [
    {
      title: 'Athletes travel to the World Games in Turin',
      date: 'May 24, 2026',
      summary: '18 Belgian athletes flew to Turin, Italy for the Special Olympics World Games. Supporters like you made this trip possible — covering travel, accommodation, and uniforms for every athlete on the team.',
      image: '/trip.png',
      tag: 'Trip',
    },
    {
      title: 'National Games 2026 — Registration Open',
      date: 'May 15, 2026',
      summary: 'Over 3,000 athletes compete across 20+ sports at Hautes Fagnes this summer. Volunteer spots still available!',
      image: 'https://special-olympics.be/wp-content/uploads/2021/03/%C2%A9GerbrandVanUytvanck_WSGAbuDhabi2019_SpecialOlympicsBelgium_140319_002.jpg',
      tag: 'Event',
    },
    {
      title: 'Cycling Series kicks off in Antwerp',
      date: 'May 10, 2026',
      summary: 'The 2026 Cycling Series opened with 120 participants. Sarah Janssen finished the 20 km route in record time.',
      image: 'https://special-olympics.be/wp-content/uploads/2026/03/CYCLING-SERIES-RGB.jpg',
      tag: 'Event',
    },
    {
      title: 'Meet our new head coach: Jan Willems',
      date: 'May 5, 2026',
      summary: 'Jan brings 15 years of inclusive-sports experience. He joins SOB to lead the national athletics programme.',
      image: 'https://special-olympics.be/wp-content/uploads/2022/02/%C2%A9GerbrandVanUytvanck_WSGAbuDhabi2019_SpecialOlympicsBelgium_170319_114.jpg',
      tag: 'Team',
    },
  ];

  // ── Future Events ────────────────────────────────────
  readonly futureEvents: FutureEvent[] = [
    {
      title: 'Jeux Nationaux 2026',
      date: 'Summer 2026',
      location: 'Hautes Fagnes, Belgium',
      description: 'The National Games bring together thousands of athletes competing across 20+ sports. Supporters are invited to cheer on the teams live.',
      image: 'https://special-olympics.be/wp-content/uploads/2022/02/%C2%A9GerbrandVanUytvanck_WSGAbuDhabi2019_SpecialOlympicsBelgium_170319_114.jpg',
    },
    {
      title: 'Special Olympics Cycling Series 2026',
      date: 'Ongoing — 2026',
      location: 'Across Belgium',
      description: 'A national cycling initiative showcasing the talent and determination of SOB athletes on courses across the country.',
      image: 'https://special-olympics.be/wp-content/uploads/2026/03/CYCLING-SERIES-RGB.jpg',
    },
    {
      title: 'Corporate Cycling Challenge',
      date: '2026',
      location: 'Belgium',
      description: 'Companies pedal together and €10 per participant is donated to Special Olympics Belgium. A great way to support athletes and bond with your team.',
      image: 'https://special-olympics.be/wp-content/uploads/2026/03/corporatecyclingchallenge.jpg',
    },
    {
      title: 'World Games — Turin 2026',
      date: 'June 2026',
      location: 'Turin, Italy',
      description: 'Belgium sends its best athletes to compete at the Special Olympics World Games. Your support helps cover travel, accommodation, and uniforms.',
      image: '/trip.png',
    },
  ];

  setTab(tab: Tab): void {
    this.activeTab.set(tab);
  }

  toggleWeek(): void {
    this.weekExpanded.update(v => !v);
  }
}
