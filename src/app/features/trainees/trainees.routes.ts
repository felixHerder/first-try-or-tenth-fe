import { Routes } from '@angular/router';
import { TraineesListComponent } from '@features/trainees/trainees-list/trainees-list.component';
import { TraineeDetailsComponent } from '@features/trainees/trainee-details/trainee-details.component';

export const TRAINEES_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TraineesListComponent,
    children: [{ path: ':uuid', component: TraineesListComponent }],
  },
  {
    path: ':uuid',
    component: TraineeDetailsComponent,
  },
];
