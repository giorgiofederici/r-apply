//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'signup',
  },
  /*
  {
    path: 'signup',
    loadChildren: () =>
      import('@r-apply/shared/auth/feature-signup').then((m) => m.SharedAuthFeatureSignupModule),
  },
  */
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SharedAuthShellAppWebModule {}
