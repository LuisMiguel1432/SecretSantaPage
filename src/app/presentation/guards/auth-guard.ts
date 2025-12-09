import { CanActivate, CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../presentation/services/auth-service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const currentUser = authService.getCurrentUser();
  if (currentUser) {
    return true;
  }
  return authService.lookForCurrentUser().pipe(
    map(()=> true), catchError(() =>{
        return of(router.createUrlTree(['/login'], {queryParams: { returnUrl: state.url }}));
    })
  )
}

