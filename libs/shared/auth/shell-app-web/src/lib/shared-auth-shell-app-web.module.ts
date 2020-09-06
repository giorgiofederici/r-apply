//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// Shared Auth Data Access
import { SharedAuthDataAccessAuthModule } from '@r-apply/shared/auth/data-access-auth';
// Shared Env
import { environment } from '@r-apply/shared/environments';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'signup',
  },
  {
    path: 'signup',
    loadChildren: () => import('@r-apply/shared/auth/feature-signup').then((m) => m.SharedAuthFeatureSignupModule),
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedAuthDataAccessAuthModule.forRoot(environment)],
})
export class SharedAuthShellAppWebModule {}
