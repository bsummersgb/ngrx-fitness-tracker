import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  exerciseSubscription: Subscription;

  constructor( private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
      exercise => {
        if (exercise) {
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        } // b/c if exercise is not null, it means the user did in fact pick one and we should be in the currentTraining view
    });
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}


// Event: user clicks START button which should trigger startExercise() method in TrainingService
// Then emit an event, to which you subscribe in the TrainingComponent which should change ongoingTraining to true
