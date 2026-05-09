import { Component, inject, OnInit, signal } from '@angular/core';
import { VehicleControllerApiService, VehicleSummaryDTO } from '@core/api/v1';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';
import { VehiclesTableComponent } from '@features/vehicles/vehicles-table/vehicles-table.component';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';
import { AppRouteConfig } from '@/app.routes.config';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-vehicles-list',
  imports: [
    NzTypographyComponent,
    NzTableModule,
    VehiclesTableComponent,
    NzFlexDirective,
    NzButtonComponent,
    RouterLink,
    NzIconDirective,
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
