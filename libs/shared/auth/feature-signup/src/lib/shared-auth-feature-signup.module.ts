// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
// Transloco
import { SharedUtilsTranslocoConfigModule } from '@r-apply/shared/utils/transloco-config';
// Material Design
import { CommonUiCustomMaterialModule } from '@r-apply/common/ui/custom-material';
// Form Builders
import { UserBuilder } from './form-builders';
// Services
import { SignupValidatorsService } from './form-builders/signup-validators.service';
// Containers
import { SignupPageComponent } from './containers/signup-page/signup-page.component';
// Components
import { SignupComponent } from './components/signup/signup.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserReviewComponent } from './components/user-review/user-review.component';
import { SignupFeedbackComponent } from './components/signup-feedback/signup-feedback.component';

// Transloco Loader
export const loader = ['en'].reduce((acc, lang) => {
  acc[lang] = () => import(`../assets/i18n/${lang}.json`);
  return acc;
}, {});

const routes: Routes = [
  {
    path: '',
    component: SignupPageComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedUtilsTranslocoConfigModule.forChild('authSignup', loader),
    CommonUiCustomMaterialModule,
  ],
  declarations: [SignupPageComponent, SignupComponent, UserFormComponent, UserReviewComponent, SignupFeedbackComponent],
  providers: [UserBuilder, SignupValidatorsService],
})
export class SharedAuthFeatureSignupModule {}
