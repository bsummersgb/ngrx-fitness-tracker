import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterOutlet } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'training', loadChildren: './training/training.module#TrainingModule', canLoad: [AuthGuard] }
  // loadChildren is the keyword for lazy loading. The # targets the class
  // canLoad is like canActivate but it runs before the bundle is loaded
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard] // ng injects Guards as a service, even though we don't inject it. Therefore, you
  // should add it to the providers array. It is a rare exception in providing a service in a separate module from the main module
})
export class AppRoutingModule {}

export const routedComponents = [WelcomeComponent];
