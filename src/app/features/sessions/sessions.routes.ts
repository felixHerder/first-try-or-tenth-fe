import { Routes } from '@angular/router';
import { SessionsListComponent } from '@features/sessions/sessions-list/sessions-list.component';
import { SessionCreateComponent } from '@features/sessions/session-create/session-create.component';
import { SessionDetailsComponent } from '@features/sessions/session-details/session-details.component';

export const SESSION_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SessionsListComponent,
    data: {
      breadcrumb: 'Session List',
      title: 'Sessions List',
      subtitle: 'List of all sessions past and present.',
    },
  },
  {
    path: 'new',
    component: SessionCreateComponent,
    data: {
      breadcrumb: 'Session Create',
      title: 'Add Session',
      subtitle: 'Please enter the session details.',
    },
  },
  {
    path: ':uuid',
    component: SessionDetailsComponent,
    data: {
      breadcrumb: 'Session Details',
      title: 'Session Details',
      subtitle: 'Update any of the session details.',
    },
  },
];
