import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { MembershipService } from '../../core/api/membership.service';
import { Payment } from './payment';

@Component({
  selector: 'app-membership-page',
  imports: [Payment],
  templateUrl: './membership-page.html',
  styleUrl: './membership-page.scss',
})
export class MembershipPage implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly membership = inject(MembershipService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    if (this.auth.currentUser()?.membershipStatus === 'active') {
      void this.router.navigateByUrl('/news');
    }
  }

  onPaid(): void {
    void this.router.navigateByUrl('/news');
  }

  skip(): void {
    this.membership.activate().subscribe({
      next: (user) => {
        this.auth.updateUser(user);
        void this.router.navigateByUrl('/news');
      },
      error: () => {
        const u = this.auth.currentUser();
        if (u) this.auth.updateUser({ ...u, membershipStatus: 'active' as any });
        void this.router.navigateByUrl('/news');
      },
    });
  }
}
