import { Routes } from '@angular/router';
import { VehicleDetailsComponent } from '@features/vehicles/vehicle-details/vehicle-details.component';
import { VehiclesListComponent } from '@features/vehicles/vehicles-list/vehicles-list.component';

export const VEHICLES_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: VehiclesListComponent,
    children: [{ path: ':uuid', component: VehicleDetailsComponent }],
  },
  {
    path: ':uuid',
    component: VehicleDetailsComponent,
  },
];
