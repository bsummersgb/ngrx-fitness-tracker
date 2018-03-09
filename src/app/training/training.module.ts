import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { StopTrainingComponent } from './current-training/stop-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { TrainingComponent } from './training.component';
import { TrainingRoutingModule } from './training-routing.module';


@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule
  ],
  // tslint:disable-next-line:max-line-length
  entryComponents: [StopTrainingComponent] // any component that will not be instatiated by its selector or via router-outlet: Angular has no idea when this component would get used otherwise. entryComponents just tells ng to be prepared to use the component
})
export class TrainingModule {

}
