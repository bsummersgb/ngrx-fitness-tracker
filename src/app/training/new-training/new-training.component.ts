import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Observable<any>; // I can't use Exercise as a payload yet because an 'Exercise'
                              // has an id and the data I get back doesn't include the id. This is because
                              // valueChanges() in OnInit strips away metadata in the returned result.

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore) { }

  ngOnInit() {
    // this.exercises = this.trainingService.getAvailableExercises();
    this.exercises = this.db
    .collection('available exercises')
    .valueChanges();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.selectedExercise);
  }
}

