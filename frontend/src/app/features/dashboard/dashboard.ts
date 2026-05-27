import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeaderboardService } from '../../core/api/leaderboard.service';
import { MembershipService } from '../../core/api/membership.service';
import { StepsService } from '../../core/api/steps.service';
import { AuthService } from '../../core/auth/auth.service';
import {
  LeaderboardResponse,
  StepEntry,
  StepSummary,
} from '../../core/models';

const STEPS_PER_KM = 1250;

@Component({
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule, DecimalPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly stepsApi = inject(StepsService);
  private readonly boardApi = inject(LeaderboardService);
  private readonly membershipApi = inject(MembershipService);
  private readonly fb = inject(FormBuilder);

  readonly user = this.auth.currentUser;
  readonly isMember = computed(() => this.user()?.membershipStatus === 'active');

  readonly summary = signal<StepSummary | null>(null);
  readonly history = signal<StepEntry[]>([]);
  readonly leaderboard = signal<LeaderboardResponse | null>(null);

  readonly activating = signal(false);
  readonly savingSteps = signal(false);
  readonly stepError = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    steps: [
      null as number | null,
      [Validators.required, Validators.min(1), Validators.max(200000)],
    ],
    date: [this.today(), [Validators.required]],
  });

  ngOnInit(): void {
    if (this.isMember()) {
      this.loadMemberData();
    }
  }

  km(steps: number): number {
    return Math.round((steps / STEPS_PER_KM) * 10) / 10;
  }

  activate(): void {
    this.activating.set(true);
    this.membershipApi.activate().subscribe({
      next: () =>
        this.auth.loadProfile().subscribe(() => {
          this.activating.set(false);
          this.loadMemberData();
        }),
      error: () => this.activating.set(false),
    });
  }

  logSteps(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.savingSteps.set(true);
    this.stepError.set(null);
    const { steps, date } = this.form.getRawValue();

    this.stepsApi.log(steps as number, date).subscribe({
      next: () => {
        this.savingSteps.set(false);
        this.form.patchValue({ steps: null });
        this.loadMemberData();
      },
      error: (err) => {
        this.stepError.set(err?.error?.message ?? 'Could not save steps.');
        this.savingSteps.set(false);
      },
    });
  }

  private loadMemberData(): void {
    this.stepsApi.summary().subscribe((s) => this.summary.set(s));
    this.stepsApi.history().subscribe((h) => this.history.set(h));
    this.boardApi.individual().subscribe((b) => this.leaderboard.set(b));
  }

  private today(): string {
    return new Date().toISOString().slice(0, 10);
  }
}
