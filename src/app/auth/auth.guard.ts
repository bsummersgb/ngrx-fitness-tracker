import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate { // implementing this interface forces you to create the canActivate() method
  constructor(
    private authService: AuthService,
    private router: Router ) {

  }

  // 1st arg: route we're trying to activate
  // 2nd arg: current routing state
  // a Guard needs to return true, a promise that resolves to true, or an Observable of true
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }

}
