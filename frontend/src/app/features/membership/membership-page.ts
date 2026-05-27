import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { Payment } from './payment';

@Component({
  selector: 'app-membership-page',
  imports: [Payment],
  templateUrl: './membership-page.html',
  styleUrl: './membership-page.scss',
})
export class MembershipPage implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    // Already a supporter? Skip straight to the dashboard.
    if (this.auth.currentUser()?.membershipStatus === 'active') {
      void this.router.navigateByUrl('/dashboard');
    }
  }

  onPaid(): void {
    void this.router.navigateByUrl('/dashboard');
  }
}
