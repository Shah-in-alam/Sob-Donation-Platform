import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ClubsService } from '../../../core/api/clubs.service';
import { AuthService } from '../../../core/auth/auth.service';
import { Club } from '../../../core/models';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly clubsService = inject(ClubsService);
  private readonly router = inject(Router);

  readonly clubs = signal<Club[]>([]);
  readonly error = signal<string | null>(null);
  readonly loading = signal(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    favoriteClubId: [''],
  });

  constructor() {
    this.clubsService.getClubs().subscribe({
      next: (clubs) => this.clubs.set(clubs),
      error: () => this.clubs.set([]),
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set(null);

    const { favoriteClubId, ...rest } = this.form.getRawValue();
    const payload = favoriteClubId ? { ...rest, favoriteClubId } : rest;

    this.auth.register(payload).subscribe({
      next: () => this.router.navigateByUrl('/membership'),
      error: (err) => {
        this.error.set(
          err?.error?.message ?? 'Registration failed. Please try again.',
        );
        this.loading.set(false);
      },
    });
  }
}
