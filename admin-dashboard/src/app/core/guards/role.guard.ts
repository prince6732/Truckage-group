import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const tokenService = inject(TokenStorageService);
  const router = inject(Router);

  const allowedRoles: string[] = route.data['roles'] || [];

  const user = tokenService.user();

  const userRole = user?.role || null;

  const hasAccess = userRole && allowedRoles.includes(userRole);

  if (hasAccess) {
    return true;
  }

  router.navigate(['/unauthorized']);
  return false;
};
