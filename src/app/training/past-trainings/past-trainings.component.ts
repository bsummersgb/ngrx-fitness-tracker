import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit {
  dataSource = new MatTableDataSource<Exercise>();
  // an object which allows Material Datatable to connect and where you define which kind of data you want to pass in: Exercise
  displayedColumns = [ 'date', 'name', 'duration', 'calories', 'state' ];

  constructor( private trainingService: TrainingService ) { }

  ngOnInit() {
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises();
  }

}
