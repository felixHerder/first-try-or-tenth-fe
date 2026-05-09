import { Routes } from '@angular/router';
import { VehicleDetailsComponent } from '@features/vehicles/vehicle-details/vehicle-details.component';
import { VehiclesListComponent } from '@features/vehicles/vehicles-list/vehicles-list.component';
import { VehicleCreateComponent } from '@features/vehicles/vehicle-create/vehicle-create.component';

export const VEHICLES_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: VehiclesListComponent,
    data: {
      breadcrumb: 'Vehicle List',
      title: 'Vehicle List',
      subtitle: 'List of all active vehicles in the fleet.',
    },
  },
  {
    path: 'new',
    component: VehicleCreateComponent,
    data: {
      breadcrumb: 'Vehicle Create',
      title: 'Vehicle Create',
      subtitle: 'Please enter the vehicle details.',
    },
  },
  {
    path: ':uuid',
    component: VehicleDetailsComponent,
    data: {
      breadcrumb: 'Vehicle Details',
      title: 'Vehicle Details',
      subtitle: 'Update any of the vehicle details.',
    },
  },
];
