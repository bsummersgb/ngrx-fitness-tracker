import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    AngularFireAuthModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule {

}
