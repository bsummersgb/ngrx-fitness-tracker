// The goal of the service is to fake a login, inform other parts of the app about the login
// so we can for instance only show the login button if the user is not already logged in.

import { Injectable, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router'; // redirect after login or signup
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';

@Injectable() // allows you to inject a service into a service (i.e. the RouterService in this case)
export class AuthService {
  private isAuthenticated = false;
  authChange = new Subject<boolean>(); // indicates signed in or not
  // You cant use the EventEmitter that angular ships with as this is only to be used
  // for emitting custom events in components. Instead you should use Subject from rxjs.
  // Like EventEmitter, you can emit events and subscribe to these emitted events in other parts of the app.

  constructor(
    private router: Router,
    private angularFireauth: AngularFireAuth,
    private trainingService: TrainingService
  ) {}

  initAuthListener() {
    this.angularFireauth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
    // this will emit an event whenever the authentication status changes i.e. authenticated to unauthenticated etc
  }

  // intialise the user with values from the signup form, send a request to the server to create the user there
  registerUser(authData: AuthData) {
    this.angularFireauth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {})
    .catch(error => {
      console.log(error);
    });

  }

  login(authData: AuthData) {
    this.angularFireauth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {})
    .catch(error => {
      console.log(error);
    });
  }

  logout() {
    this.angularFireauth.auth.signOut();
  }

  // if user is not equal to null, then the user is authenticated so isAuth() will return true
  isAuth() {
    return this.isAuthenticated;
  }
}
