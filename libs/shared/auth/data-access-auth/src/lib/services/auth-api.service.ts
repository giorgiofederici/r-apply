// Angular
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Rxjs
import { Observable, of } from 'rxjs';
// Models
import { User } from '../models/user.model';

@Injectable()
export class AuthApiService {
  constructor(@Inject('environment') private environment, private httpClient: HttpClient) {}

  // Signup
  signup(user: User): Observable<any> {
    return this.httpClient.post<any>(`${this.environment.api}/signup`, user);
  }

  // Check email
  checkEmail(email: string): Observable<any> {
    const checkEmailBody: Partial<User> = {
      campaignUuid: this.environment.campaignUuid,
      data: {
        email,
      },
    };
    return this.httpClient.post<any>(`${this.environment.api}/check-user`, checkEmailBody);
  }
}
