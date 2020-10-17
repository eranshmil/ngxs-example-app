import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxsModule } from '@ngxs/store';

import { LoginPageComponent } from './containers/login-page.component';
import { LoginFormComponent } from './components/login-form.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { MaterialModule } from '../material';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthStates } from './store';

export const COMPONENTS = [LoginPageComponent, LoginFormComponent];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<RootAuthModule> {
    return {
      ngModule: RootAuthModule,
      providers: [AuthService, AuthGuard],
    };
  }
}

@NgModule({
  imports: [AuthModule, AuthRoutingModule, NgxsModule.forFeature(AuthStates)],
})
export class RootAuthModule {}
