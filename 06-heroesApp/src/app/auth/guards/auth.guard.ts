import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => console.log('Is authenticated', isAuthenticated)),
      tap( isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/auth/login']);
        }
      }),
    )
  }

  canMatch: CanMatchFn = (
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> => {
    // console.log('CanMatch');
    // console.log({ route, segments });

    return this.checkAuthStatus();
  };

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> => {
    // console.log('CanActivate');
    // console.log({ route, state });

    return this.checkAuthStatus();
  };
}
