import { Routes } from '@angular/router';
import { VehicleDetailsComponent } from '@features/vehicles/vehicle-details/vehicle-details.component';
import { InstructorsListComponent } from '@features/instructors/instructors-list/instructors-list.component';
import { InstructorDetailsComponent } from '@features/instructors/instructor-details/instructor-details.component';

export const INSTRUCTOR_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: InstructorsListComponent,
    children: [{ path: ':uuid', component: VehicleDetailsComponent }],
  },
  {
    path: ':uuid',
    component: InstructorDetailsComponent,
  },
];
