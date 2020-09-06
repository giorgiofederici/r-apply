// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
// RxJS
import { Observable } from 'rxjs';
// NgRx
import { Store, select } from '@ngrx/store';
import {
  getAuthLoading,
  getAuthError,
  getAuthUser,
  signup,
  setUser,
  User,
  EmailCheck,
  getAuthEmailCheck,
  getAuthSuccess,
} from '@r-apply/shared/auth/data-access-auth';

@Component({
  selector: 'r-apply-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  success$: Observable<string | null>;
  user$: Observable<User | null>;
  emailCheck$: Observable<EmailCheck | null>;

  constructor(private store: Store<{}>, private router: Router) {
    this.loading$ = this.store.pipe(select(getAuthLoading));
    this.error$ = this.store.pipe(select(getAuthError));
    this.success$ = this.store.pipe(select(getAuthSuccess));
    this.user$ = this.store.pipe(select(getAuthUser));
    this.emailCheck$ = this.store.pipe(select(getAuthEmailCheck));
  }

  ngOnInit() {}

  ngOnDestroy() {}

  onReviewUser(user: User) {
    this.store.dispatch(setUser({ user }));
  }

  onSignupUser(user: User) {
    this.store.dispatch(signup({ user }));
  }
}
