import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from '../models';

const TOKEN_KEY = 'sob_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly api = environment.apiUrl;

  readonly token = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  readonly currentUser = signal<User | null>(null);
  readonly isAuthenticated = computed(() => this.token() !== null);

  constructor() {
    // Restore the session on a hard refresh if a token is present.
    if (this.token()) {
      this.loadProfile().subscribe({ error: () => this.logout() });
    }
  }

  register(payload: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.api}/auth/register`, payload)
      .pipe(tap((res) => this.setSession(res)));
  }

  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.api}/auth/login`, payload)
      .pipe(tap((res) => this.setSession(res)));
  }

  loadProfile(): Observable<User> {
    return this.http
      .get<User>(`${this.api}/auth/me`)
      .pipe(tap((user) => this.currentUser.set(user)));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.token.set(null);
    this.currentUser.set(null);
  }

  private setSession(res: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, res.accessToken);
    this.token.set(res.accessToken);
    this.currentUser.set(res.user);
  }
}
