import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes) // this merges it with the root router
  ],
  exports: [
    RouterModule
  ],
})
export class AuthRoutingModule {}

