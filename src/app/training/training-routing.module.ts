import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training.component';

const trainingRoutes: Routes = [
  { path: '', component: TrainingComponent} //
  // canActivate prop is an array of classes that all must implement the CanActivate interface
];

@NgModule({
  imports: [
    RouterModule.forChild(trainingRoutes)
  ],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
