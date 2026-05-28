import { Routes } from '@angular/router';
import { authGuard, membershipGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing').then((m) => m.Landing),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register').then((m) => m.Register),
  },
  {
    path: 'membership',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/membership/membership-page').then(
        (m) => m.MembershipPage,
      ),
  },
  {
    path: 'news',
    canActivate: [authGuard, membershipGuard],
    loadComponent: () =>
      import('./features/news/news').then((m) => m.NewsPage),
  },
  {
    path: 'events',
    canActivate: [authGuard, membershipGuard],
    loadComponent: () =>
      import('./features/events/events').then((m) => m.EventsPage),
  },
  {
    path: 'impact',
    canActivate: [authGuard, membershipGuard],
    loadComponent: () =>
      import('./features/impact/impact').then((m) => m.ImpactPage),
  },
  { path: '**', redirectTo: '' },
];
