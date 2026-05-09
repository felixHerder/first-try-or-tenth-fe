import { Routes } from '@angular/router';
import { SessionsListComponent } from '@features/sessions/sessions-list/sessions-list.component';
import { SessionCreateComponent } from '@features/sessions/session-create/session-create.component';
import { SessionDetailsComponent } from '@features/sessions/session-details/session-details.component';

export const SESSION_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SessionsListComponent,
  },
  {
    path: 'new',
    component: SessionCreateComponent,
  },
  {
    path: ':uuid',
    component: SessionDetailsComponent,
  },
];
