import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/** Requires a logged-in user; otherwise redirects to the login page. */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isAuthenticated() ? true : router.createUrlTree(['/login']);
};

/** Requires an active membership (paid tier); otherwise sends to membership. */
export const membershipGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const user = auth.currentUser();
  return user?.membershipStatus === 'active'
    ? true
    : router.createUrlTree(['/membership']);
};
