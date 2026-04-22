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
        loadComponent: () =>
          import('./features/vehicles/vehicles-list/vehicles-list.component').then(
            (m) => m.VehiclesListComponent,
          ),
      },
      {
        path: AppRouteConfig.SESSIONS.path,
        loadComponent: () =>
          import('./features/sessions/sessions-list/sessions-list.component').then(
            (m) => m.SessionsListComponent,
          ),
      },
      {
        path: AppRouteConfig.INSTRUCTORS.path,
        loadComponent: () =>
          import('./features/instructors/instructors-list/instructors-list.component').then(
            (m) => m.InstructorsListComponent,
          ),
      },
      {
        path: AppRouteConfig.TRAINEES.path,
        loadComponent: () =>
          import('./features/trainees/trainees-list/trainees-list.component').then(
            (m) => m.TraineesListComponent,
          ),
      },
      {
        path: AppRouteConfig.USERS.path,
        loadComponent: () =>
          import('./features/users/users-list/users-list.component').then(
            (m) => m.UsersListComponent,
          ),
      },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];
