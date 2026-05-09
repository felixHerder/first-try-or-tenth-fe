import { Routes } from '@angular/router';
import { InstructorsListComponent } from '@features/instructors/instructors-list/instructors-list.component';
import { InstructorDetailsComponent } from '@features/instructors/instructor-details/instructor-details.component';
import { InstructorCreateComponent } from '@features/instructors/instructor-create/instructor-create.component';

export const INSTRUCTOR_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: InstructorsListComponent,
    data: {
      breadcrumb: 'Instructor List',
      title: 'Instructor List',
      subtitle: 'List of all active instructors registered with the school',
    },
  },
  {
    path: 'new',
    component: InstructorCreateComponent,
    data: {
      breadcrumb: 'Instructor Create',
      title: 'Add Instructor',
      subtitle: 'Please enter the instructor profile details.',
    },
  },
  {
    path: ':uuid',
    component: InstructorDetailsComponent,
    data: {
      breadcrumb: 'Instructor Details',
      title: 'Instructor Details',
      subtitle: 'Update any of the instructor details.',
    },
  },
];
