import { Routes } from '@angular/router';
import { UsersListComponent } from '@features/users/users-list/users-list.component';
import { UserCreateComponent } from '@features/users/user-create/user-create.component';
import { UserDetailsComponent } from '@features/users/user-details/user-details.component';

export const USER_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UsersListComponent,
    data: {
      breadcrumb: 'User List',
      title: 'User List',
      subtitle: 'List of all active administrative users.',
    },
  },
  {
    path: 'new',
    component: UserCreateComponent,
    data: {
      breadcrumb: 'User Create',
      title: 'Add User',
      subtitle: 'Please enter the user details.',
    },
  },
  {
    path: ':uuid',
    component: UserDetailsComponent,
    data: {
      breadcrumb: 'User Details',
      title: 'User Details',
      subtitle: 'Update any of the user details. The current or a new password must be provided.',
    },
  },
];
