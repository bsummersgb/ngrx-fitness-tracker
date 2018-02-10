import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDatepicker } from "@angular/material";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;
  constructor() { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18); // limits pickable year of birth to anyone above the age of 18
    
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

}
