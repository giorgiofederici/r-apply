// NgRx
import { createReducer, on, Action } from '@ngrx/store';
// NgRx Auth
import * as AuthActions from './auth.actions';
// Models
import { User } from '../models/user.model';
import { EmailCheck } from '../models/email-check.model';

export const AUTH_FEATURE_KEY = 'auth';

export interface State {
  loading: boolean;
  error?: string | null;
  success?: string | null;
  user?: User | null;
  token?: string | null;
  emailCheck?: EmailCheck;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const initialState: State = {
  loading: false,
};

const authReducer = createReducer(
  initialState,
  // Set User
  on(AuthActions.setUser, (state, { user }) => ({ ...state, user })),
  // Signup
  on(AuthActions.signup, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.signupSuccess, (state, { token, success }) => ({
    ...state,
    loading: false,
    error: null,
    token,
    success,
  })),
  on(AuthActions.signupFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // Check email
  on(AuthActions.checkEmail, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.checkEmailSuccess, (state, { emailCheck }) => ({
    ...state,
    emailCheck,
    loading: false,
    error: null,
  })),
  on(AuthActions.checkEmailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
