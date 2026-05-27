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

  /** Logged-in users go to their dashboard (to activate); guests sign up. */
  protected readonly supportLink = computed(() =>
    this.auth.isAuthenticated() ? '/dashboard' : '/register',
  );

  logout(): void {
    this.auth.logout();
    void this.router.navigateByUrl('/');
  }
}
