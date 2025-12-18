import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found-component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/login/login-component').then(
                (c) => c.LoginComponent
            ),
    },
    {
        path: 'forgot-password',
        loadComponent: () =>
            import('./features/auth/forgot-password/forgot-password-component').then(
                (m) => m.ForgotPasswordComponent
            ),
    },
    {
        path: 'reset-password/:token',
        loadComponent: () =>
            import('./features/auth/reset-password/reset-password-component').then(
                (m) => m.ResetPasswordComponent
            ),
    },
    {
        path: '',
        loadChildren: () =>
            import('./shared/layouts/dashboard/dashboard-routing-module').then(
                (m) => m.dashboardRoutes
            ),
        canActivate: [authGuard, roleGuard],
        data: { roles: ['ADMIN'] },
    },

    {
        path: 'unauthorized',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./shared/components/unauthorized/unauthorized-component').then((m) => m.UnauthorizedComponent),
    },
    { path: 'not-found', component: NotFoundComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: 'not-found' }
];
