// The goal of the service is to fake a login, inform other parts of the app about the login
// so we can for instance only show the login button if the user is not already logged in.

import { Injectable, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router'; // redirect after login or signup
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';

@Injectable() // allows you to inject a service into a service (i.e. the RouterService in this case)
export class AuthService {
  private user: User; // initially, user is undefined. It's then an object after calling registerUser() OR
                      // login; and then null again on logout()
  authChange = new Subject<boolean>(); // indicates signed in or not
  // You cant use the EventEmitter that angular ships with as this is only to be used
  // for emitting custom events in components. Instead you should use Subject from rxjs.
  // Like EventEmitter, you can emit events and subscribe to these emitted events in other parts of the app.

  constructor( private router: Router ) { }

  // intialise the user with values from the signup form, send a request to the server to create the user there
  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString() // generate an 'almost' random id (we'll get one from the server later)
    };
    this.authSuccessfully(['/training']);
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString() // generate an 'almost' random id (we'll get one from the server later)
    };
    this.authSuccessfully(['/training']);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  // provide access to the privately declared user object
  getUser() {
    return { ...this.user };
  }

  /* we use the spread operator to avoid people being able to change the value of user in the class.
   for instance, if I just declared return this.user; because 'user' is a reference to the user object,
   other code outside the class would be able to change its value via the getUser() method. Using the spread
   operator will make a new object and return a brand new object that has the same properties and values but
   in a different object.
  */

  // if user is not equal to null, then the user is authenticated so isAuth() will return true
  isAuth() {
    return this.user;
  }

  private authSuccessfully(route: Array<string>) {
    this.authChange.next(true);  // next() acts in place of emit() which I'd use on an EventEmitter
    this.router.navigate(route);
  }
}
