import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {
    path: 'login',
    loadComponent: () => import("./layouts/auth-layout/auth-layout.component").then(m => m.AuthLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import("./pages/login/login.component").then(m => m.LoginComponent)
      }
    ]
  },
  {
    path: 'dashboard',
    loadComponent: () => import("./layouts/main-layout/main-layout.component").then(m => m.MainLayoutComponent),
    children: []
  },
];
