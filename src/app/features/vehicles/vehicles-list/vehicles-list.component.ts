import { Component, inject, OnInit, signal } from '@angular/core';
import { VehicleControllerApiService, VehicleSummaryDTO } from '@core/api/v1';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';
import { VehiclesTableComponent } from '@features/vehicles/vehicles-table/vehicles-table.component';

@Component({
  selector: 'app-vehicles-list',
  imports: [NzTypographyComponent, NzTableModule, VehiclesTableComponent],
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
}
