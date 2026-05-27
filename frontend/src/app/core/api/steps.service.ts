import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StepEntry, StepSummary } from '../models';

@Injectable({ providedIn: 'root' })
export class StepsService {
  private readonly http = inject(HttpClient);
  private readonly api = environment.apiUrl;

  log(steps: number, date?: string): Observable<StepEntry> {
    const body = date ? { steps, date } : { steps };
    return this.http.post<StepEntry>(`${this.api}/steps`, body);
  }

  history(): Observable<StepEntry[]> {
    return this.http.get<StepEntry[]>(`${this.api}/steps`);
  }

  summary(): Observable<StepSummary> {
    return this.http.get<StepSummary>(`${this.api}/steps/summary`);
  }
}
