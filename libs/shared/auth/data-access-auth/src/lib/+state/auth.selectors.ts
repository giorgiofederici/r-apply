// NgRx
import { createFeatureSelector, createSelector } from '@ngrx/store';
// NgRx - Auth
import { AUTH_FEATURE_KEY, State, AuthPartialState } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
export const getAuthState = createFeatureSelector<AuthPartialState, State>(AUTH_FEATURE_KEY);

export const getAuthLoading = createSelector(getAuthState, (state: State) => state.loading);
export const getAuthError = createSelector(getAuthState, (state: State) => state.error);
export const getAuthUser = createSelector(getAuthState, (state: State) => state.user);
export const getAuthSuccess = createSelector(getAuthState, (state: State) => state.success);

export const getAuthEmailCheck = createSelector(getAuthState, (state: State) => state.emailCheck);
