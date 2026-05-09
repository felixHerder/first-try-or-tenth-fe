import { Component, inject, OnInit, signal } from '@angular/core';
import { VehicleControllerApiService, VehicleSummaryDTO } from '@core/api/v1';
import { NzTableModule } from 'ng-zorro-antd/table';
import { VehiclesTableComponent } from '@features/vehicles/vehicles-table/vehicles-table.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';
import { AppRouteConfig } from '@/app.routes.config';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzFlexDirective } from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-vehicles-list',
  imports: [
    NzTableModule,
    VehiclesTableComponent,
    NzButtonComponent,
    RouterLink,
    NzIconDirective,
    NzFlexDirective,
  ],
  templateUrl: './vehicles-list.component.html',
  styleUrl: './vehicles-list.component.css',
})
export class VehiclesListComponent implements OnInit {
  private vehiclesApi = inject(VehicleControllerApiService);
  loading = signal<boolean>(false);
  vehicles = signal<VehicleSummaryDTO[]>([]);

  ngOnInit(): void {
    this.loading.set(true);
    this.vehiclesApi.getAll().subscribe({
      next: (vehicles) => {
        this.loading.set(false);
        this.vehicles.set(vehicles);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  protected readonly AppRouteConfig = AppRouteConfig;
}
