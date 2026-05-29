import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { MembershipService } from '../../core/api/membership.service';
import { Payment } from './payment';

@Component({
  selector: 'app-membership-page',
  imports: [Payment, FormsModule],
  templateUrl: './membership-page.html',
  styleUrl: './membership-page.scss',
})
export class MembershipPage implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly membership = inject(MembershipService);
  private readonly router = inject(Router);

  readonly showModal = signal(false);
  readonly message = signal('');

  ngOnInit(): void {
    if (this.auth.currentUser()?.membershipStatus === 'active') {
      void this.router.navigateByUrl('/news');
    }
  }

  onPaid(): void {
    this.showModal.set(true);
  }

  closeModal(): void {
    void this.router.navigateByUrl('/news');
  }

  skip(): void {
    this.membership.activate().subscribe({
      next: (user) => {
        this.auth.updateUser(user);
        this.showModal.set(true);
      },
      error: () => {
        this.showModal.set(true);
      },
    });
  }
}
