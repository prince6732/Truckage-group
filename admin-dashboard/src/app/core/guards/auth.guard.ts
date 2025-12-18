import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenStorageService);
  const router = inject(Router);

  if (!tokenService.isAuthenticated()) {
    router.navigate(['/login'], {
      queryParams: { redirectTo: state.url }
    });
    return false;
  }

  return true;
};
