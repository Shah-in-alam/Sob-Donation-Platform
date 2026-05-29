import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MembershipService } from '../../core/api/membership.service';
import { AuthService } from '../../core/auth/auth.service';
import QRCode from 'qrcode';

@Component({
  selector: 'app-payment',
  imports: [ReactiveFormsModule],
  templateUrl: './payment.html',
  styleUrl: './payment.scss',
})
export class Payment implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly membership = inject(MembershipService);
  private readonly auth = inject(AuthService);

  @Output() paid = new EventEmitter<void>();

  readonly processing = signal(false);
  readonly error = signal<string | null>(null);
  readonly mode = signal<'monthly' | 'once'>('monthly');
  readonly oneTimeAmount = signal(25);
  readonly qrDataUrl = signal<string>('');

  readonly form = this.fb.nonNullable.group({
    amount: [10, [Validators.required, Validators.min(10)]],
    cardName: ['', [Validators.required, Validators.minLength(2)]],
    cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9 ]{12,23}$/)]],
    expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
    cvc: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
  });

  get amount(): number {
    return this.form.controls.amount.value || 10;
  }

  ngOnInit(): void {
    this.generateQr();
  }

  setMode(m: 'monthly' | 'once'): void {
    this.mode.set(m);
    if (m === 'once') this.generateQr();
  }

  updateOneTimeAmount(val: string): void {
    const n = parseInt(val, 10);
    if (!isNaN(n) && n > 0) {
      this.oneTimeAmount.set(n);
      this.generateQr();
    }
  }

  private generateQr(): void {
    const amount = this.oneTimeAmount();
    const ref = `SOB-${Date.now()}`;
    const payload = `BCD\n002\n1\nSCT\nGEBABEBB\nSpecial Olympics Belgium\nBE81001205237124\nEUR${amount}\n\n${ref}\nSOB Supporter Donation`;
    QRCode.toDataURL(payload, { width: 240, margin: 2, color: { dark: '#1a1a2e', light: '#ffffff' } })
      .then(url => this.qrDataUrl.set(url));
  }

  pay(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.processing.set(true);
    this.error.set(null);

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
