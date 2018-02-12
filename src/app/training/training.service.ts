import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();

  private availableExercises: Exercise[] = [
    { id: 'plank', name: 'Plank', duration: 30, calories: 8 },
    { id: 'pikepups', name: 'Pike Push Ups', duration: 180, calories: 15 },
    { id: 'lunges', name: 'Lunges', duration: 120, calories: 8 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];

  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  constructor() { }

  getAvailableExercises() {
    return this.availableExercises.slice(); // returns a copy of the array and keeps the original untouched
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
