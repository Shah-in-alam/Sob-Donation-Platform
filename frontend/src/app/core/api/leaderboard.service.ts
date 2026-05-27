import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LeaderboardResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class LeaderboardService {
  private readonly http = inject(HttpClient);

  individual(): Observable<LeaderboardResponse> {
    return this.http.get<LeaderboardResponse>(
      `${environment.apiUrl}/leaderboard/individual`,
    );
  }
}
