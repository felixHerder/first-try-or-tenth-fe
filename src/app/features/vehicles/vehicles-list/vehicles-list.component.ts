import { Component, inject, OnInit, signal } from '@angular/core';
import { VehicleControllerApiService, VehicleSummaryDTO, VehicleSummaryDTOTransmissionTypeEnum } from '@core/api/v1';
import { NzTableComponent, NzTableModule } from 'ng-zorro-antd/table';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vehicles-list',
  imports: [NzTableComponent, NzTypographyComponent, NzTableModule, RouterLink],
  templateUrl: './vehicles-list.component.html',
  styleUrl: './vehicles-list.component.css',
})
export class VehiclesListComponent implements OnInit {
  private vehiclesApi = inject(VehicleControllerApiService);
  loading = signal<boolean>(false);
  vehicles = signal<VehicleSummaryDTO[]>([]);
  protected readonly VehicleSummaryDTOTransmissionTypeEnum = VehicleSummaryDTOTransmissionTypeEnum;

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
