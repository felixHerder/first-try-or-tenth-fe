import { Routes } from '@angular/router';
import { UsersListComponent } from '@features/users/users-list/users-list.component';
import { UserCreateComponent } from '@features/users/user-create/user-create.component';
import { UserDetailsComponent } from '@features/users/user-details/user-details.component';

export const USER_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UsersListComponent,
  },
  {
    path: 'new',
    component: UserCreateComponent,
  },
  {
    path: ':uuid',
    component: UserDetailsComponent,
  },
];
