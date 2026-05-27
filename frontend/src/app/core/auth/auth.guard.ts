import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../models';
import { AuthService } from './auth.service';

/** Requires a logged-in user; otherwise redirects to the login page. */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isAuthenticated() ? true : router.createUrlTree(['/login']);
};

/**
 * Requires an active membership (paid tier). Non-members are sent to the
 * payment page. On a hard refresh the profile may not be loaded yet, so we
 * fetch it first before deciding.
 */
export const membershipGuard: CanActivateFn = ():
  | boolean
  | UrlTree
  | Observable<boolean | UrlTree> => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const decide = (user: User | null): boolean | UrlTree =>
    user?.membershipStatus === 'active'
      ? true
      : router.createUrlTree(['/membership']);

  if (auth.currentUser()) {
    return decide(auth.currentUser());
  }
  if (!auth.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }
  return auth.loadProfile().pipe(
    map(decide),
    catchError(() => of(router.createUrlTree(['/login']))),
  );
};
