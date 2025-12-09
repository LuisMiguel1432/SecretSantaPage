import { inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable, throwError, catchError, switchMap } from 'rxjs';
import { AuthInfraestructureService } from '../auth/auth-infrastructure-service';
import { Router } from '@angular/router';

export const myInterceptor: HttpInterceptorFn = (req, next) => {
  const authInfrastructureService = inject(AuthInfraestructureService);
  const router = inject(Router);

  if (req.url.endsWith('/login') || req.url.endsWith('/register') || req.url.endsWith('/refresh')) {
    return next(req);
  }

  const clonedReq = req.clone({ 
  headers: req.headers.set('Authorization', `Bearer ${authInfrastructureService.getAccessToken()}`) });
  
  return next(clonedReq).pipe(
    catchError((err) => {
      if(err.status === 403 && (err.error.error === "ACCESS_TOKEN_EXPIRED" || err.error.error === "INVALID_ACCESS_TOKEN")){
            return authInfrastructureService.refreshToken().pipe(
                switchMap((response)=> {
                  const retryReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${authInfrastructureService.getAccessToken()}`) });
                  return next(retryReq);
                }),
                catchError(error =>{
                    authInfrastructureService.logout();
                    return throwError(() => error)
                })
            )
        }


      return throwError(() => err);
    })
  );

  
};


