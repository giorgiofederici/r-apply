// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// Transloco
import { SharedUtilsTranslocoConfigModule } from '@r-apply/shared/utils/transloco-config';
// NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// Custom Material
import { CommonUiCustomMaterialModule } from '@r-apply/common/ui/custom-material';
// Shared Env
import { environment } from '@r-apply/shared/environments';
// Containers
import { AppComponent } from './containers/app/app.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@r-apply/shared/auth/shell-app-web').then((m) => m.SharedAuthShellAppWebModule),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    SharedUtilsTranslocoConfigModule.forRoot(environment.production),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    CommonUiCustomMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
