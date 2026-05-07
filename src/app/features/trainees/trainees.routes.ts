import { Routes } from '@angular/router';
import { TraineesListComponent } from '@features/trainees/trainees-list/trainees-list.component';
import { TraineeDetailsComponent } from '@features/trainees/trainee-details/trainee-details.component';
import { TraineeCreateComponent } from '@features/trainees/trainee-create/trainee-create.component';

export const TRAINEES_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TraineesListComponent,
    children: [{ path: ':uuid', component: TraineesListComponent }],
  },
  {
    path: 'new',
    component: TraineeCreateComponent,
  },
  {
    path: ':uuid',
    component: TraineeDetailsComponent,
  },
];
