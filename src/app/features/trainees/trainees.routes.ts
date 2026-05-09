import { Routes } from '@angular/router';
import { TraineesListComponent } from '@features/trainees/trainees-list/trainees-list.component';
import { TraineeDetailsComponent } from '@features/trainees/trainee-details/trainee-details.component';
import { TraineeCreateComponent } from '@features/trainees/trainee-create/trainee-create.component';

export const TRAINEES_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TraineesListComponent,
    data: {
      breadcrumb: 'Trainee List',
      title: 'Trainee List',
      subtitle: 'List of all active trainees registered with the school',
    },
  },
  {
    path: 'new',
    component: TraineeCreateComponent,
    data: {
      breadcrumb: 'Trainee Create',
      title: 'Add Trainee',
      subtitle: 'Please enter the trainee profile details.',
    },
  },
  {
    path: ':uuid',
    component: TraineeDetailsComponent,
    data: {
      breadcrumb: 'Trainee Details',
      title: 'Trainee Details',
      subtitle: 'Update any of the trainee details.',
    },
  },
];
