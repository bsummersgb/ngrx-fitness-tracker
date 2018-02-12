import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterOutlet } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TrainingComponent } from './training/training.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'training', component: TrainingComponent, canActivate: [AuthGuard]}, // canActivate prop is an array
  // of classes that all must implement the CanActivate interface
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard] // ng injects Guards as a service, even though we don't inject it. Therefore, you
  // should add it to the providers array. It is a rare exception in providing a service in a separate module from the main module
})
export class AppRoutingModule { }

export const routedComponents = [WelcomeComponent];
