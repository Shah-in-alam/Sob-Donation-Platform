import { Component, computed, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  /** Guests log in first; logged-in non-members go to the payment page. */
  protected readonly supportLink = computed(() =>
    this.auth.isAuthenticated() ? '/membership' : '/login',
  );

  /** Hide the call-to-action once the user is already an active supporter. */
  protected readonly showSupport = computed(
    () => this.auth.currentUser()?.membershipStatus !== 'active',
  );

  logout(): void {
    this.auth.logout();
    void this.router.navigateByUrl('/');
  }
}
