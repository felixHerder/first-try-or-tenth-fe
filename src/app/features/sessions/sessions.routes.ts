import { Routes } from '@angular/router';
import { SessionsListComponent } from '@features/sessions/sessions-list/sessions-list.component';

export const SESSION_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SessionsListComponent,
  },
  {
    path: 'new',
    component: SessionsListComponent,
  },
  {
    path: ':uuid',
    component: SessionsListComponent,
  },
];
