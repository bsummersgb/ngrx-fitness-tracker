import { Component, Inject } from '@angular/core';
// Use @Inject in the constructor when you are injecting an object instead of the usual class
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-stop-training',
  template: `
              <h1 mat-dialog-title>Are you sure?</h1>
              <mat-dialog-content>
                <p>You've already at {{passedData.progress}}%</p>
              </mat-dialog-content>
              <mat-dialog-actions>
                <button mat-button [mat-dialog-close]="true">Yes</button>
                <button mat-button [mat-dialog-close]="false">No</button>
              </mat-dialog-actions>
              `
})

export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {

  }

}
