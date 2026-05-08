import { Routes } from '@angular/router';
import { VehicleDetailsComponent } from '@features/vehicles/vehicle-details/vehicle-details.component';
import { VehiclesListComponent } from '@features/vehicles/vehicles-list/vehicles-list.component';
import { VehicleCreateComponent } from '@features/vehicles/vehicle-create/vehicle-create.component';

export const VEHICLES_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: VehiclesListComponent,
  },
  {
    path: 'new',
    component: VehicleCreateComponent,
  },
  {
    path: ':uuid',
    component: VehicleDetailsComponent,
  },
];
