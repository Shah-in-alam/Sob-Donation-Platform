import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class MembershipService {
  private readonly http = inject(HttpClient);
  private readonly api = environment.apiUrl;

  activate(): Observable<User> {
    return this.http.post<User>(`${this.api}/membership/activate`, {});
  }

  cancel(): Observable<User> {
    return this.http.post<User>(`${this.api}/membership/cancel`, {});
  }
}
