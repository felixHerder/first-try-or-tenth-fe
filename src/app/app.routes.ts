import {Routes} from '@angular/router';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {
    path: 'login',
    loadComponent: () => import("./shared/components/layouts/auth-layout/auth-layout.component")
      .then(m => m.AuthLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import("./features/auth/login/login.component")
          .then(m => m.LoginComponent)
      }
    ]
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import("./shared/components/layouts/main-layout/main-layout.component")
      .then(m => m.MainLayoutComponent),
    children: []
  },
];
