import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';

      if (error.status === 401 || error.status === 403) {
        errorMessage = 'Session expired. Please login again.';
        router.navigate(['/login']).then();
      } else {
        errorMessage = error.error?.message || `Error ${error.status}`;
      }
      console.error('HTTP Error:', errorMessage);

      return throwError(() => new Error(errorMessage));
    }),
  );
};
