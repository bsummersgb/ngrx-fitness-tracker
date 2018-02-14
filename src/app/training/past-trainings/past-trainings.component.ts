import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Exercise>();
  // an object which allows Material Datatable to connect and where you define which kind of data you want to pass in: Exercise
  displayedColumns = [ 'date', 'name', 'duration', 'calories', 'state' ];

  @ViewChild(MatSort) sort: MatSort; // provides access to the underlying sorting setup Material infers for us
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private trainingService: TrainingService ) { }

  ngOnInit() {
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises();
  }

  // because the 'sort' variable is coming from the template which is not finished rendering when OnInit is called
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
