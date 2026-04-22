import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    map((user) => {
      //TODO remove guard bypass
      return true;
      if (user !== null) {
        return true;
      } else {
        router.navigate(['/login']).then();
        return false;
      }
    }),
  );
};
