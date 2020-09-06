// Angular
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
// NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// NgRx - Auth
import * as fromAuth from './+state/auth.reducer';
import { AuthEffects } from './+state/auth.effects';
// Services
import { AuthApiService } from './services/auth-api.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class SharedAuthDataAccessAuthModule {
  static forRoot(
    environment: any
  ): ModuleWithProviders<SharedAuthDataAccessAuthModule> {
    return {
      ngModule: SharedAuthDataAccessAuthModule,
      providers: [
        { provide: 'environment', useValue: environment },
        AuthApiService,
      ],
    };
  }
}
