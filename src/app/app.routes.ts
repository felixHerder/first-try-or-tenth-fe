import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { AppRouteConfig } from '@/app.routes.config';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./shared/components/layouts/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent,
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/auth/login/login.component').then((m) => m.LoginComponent),
      },
    ],
  },
  {
    path: '',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    loadComponent: () =>
      import('./shared/components/layouts/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent,
      ),
    children: [
      { path: '', pathMatch: 'full', redirectTo: AppRouteConfig.DASHBOARD.path },
      {
        path: AppRouteConfig.DASHBOARD.path,
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: AppRouteConfig.VEHICLES.path,
        loadChildren: () =>
          import('./features/vehicles/vehicles.routes').then((m) => m.VEHICLES_ROUTES),
      },
      {
        path: AppRouteConfig.SESSIONS.path,
        loadChildren: () =>
          import('./features/sessions/sessions.routes').then((m) => m.SESSION_ROUTES),
      },
      {
        path: AppRouteConfig.INSTRUCTORS.path,
        loadChildren: () =>
          import('./features/instructors/instructor.routes').then((m) => m.INSTRUCTOR_ROUTES),
      },
      {
        path: AppRouteConfig.TRAINEES.path,
        loadChildren: () =>
          import('./features/trainees/trainees.routes').then((m) => m.TRAINEES_ROUTES),
      },
      {
        path: AppRouteConfig.USERS.path,
        loadChildren: () => import('./features/users/users.routes').then((m) => m.USER_ROUTES),
      },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];
