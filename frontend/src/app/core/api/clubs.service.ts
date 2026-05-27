import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Club } from '../models';

@Injectable({ providedIn: 'root' })
export class ClubsService {
  private readonly http = inject(HttpClient);

  getClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(`${environment.apiUrl}/clubs`);
  }
}
