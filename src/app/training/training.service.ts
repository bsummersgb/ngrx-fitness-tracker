import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs/Subject';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];

  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  constructor(private db: AngularFirestore) { }

  fetchAvailableExercises() {
    return this.db
    .collection('available exercises')
    .snapshotChanges()                    // this firestore method returns an Obs, tf we can subscribe to it
    .map(docArray => {
      return docArray.map(doc => {
        return {
        id: doc.payload.doc.id,
        ...doc.payload.doc.data()
        };
      });
    })
    .subscribe((exercises: Exercise[]) => {
      this.availableExercises = exercises;
      this.exercisesChanged.next([...this.availableExercises]);
    });
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(exercise => exercise.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise}); // you don't want to return the same object you're storing in the service
  }

  completeExercise(progress: number) {
    this.exercises.push( {
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'completed'
    }); // the spread syntax copies all the props to a new object & then assigns new props: date, state
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push( {
      ...this.runningExercise,
      date: new Date(),
      state: 'cancelled'
    }); // the spread syntax copies all the props to a new object & then assigns new props: date, state
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  }
}
