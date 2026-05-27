import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MembershipService } from '../../core/api/membership.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-payment',
  imports: [ReactiveFormsModule],
  templateUrl: './payment.html',
  styleUrl: './payment.scss',
})
export class Payment {
  private readonly fb = inject(FormBuilder);
  private readonly membership = inject(MembershipService);
  private readonly auth = inject(AuthService);

  /** Emitted once the (prototype) payment succeeds and membership is active. */
  @Output() paid = new EventEmitter<void>();

  readonly processing = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    cardName: ['', [Validators.required, Validators.minLength(2)]],
    cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9 ]{12,23}$/)]],
    expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
    cvc: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
  });

  pay(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.processing.set(true);
    this.error.set(null);

    // Prototype only: simulate a gateway round-trip, then activate membership.
    // No real charge is made. Phase 2 replaces this with Stripe Checkout.
    setTimeout(() => {
      this.membership.activate().subscribe({
        next: () =>
          this.auth.loadProfile().subscribe(() => {
            this.processing.set(false);
            this.paid.emit();
          }),
        error: () => {
          this.error.set('Payment could not be completed. Please try again.');
          this.processing.set(false);
        },
      });
    }, 1200);
  }
}
