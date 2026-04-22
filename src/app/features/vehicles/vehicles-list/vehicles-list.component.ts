import { Component, inject, OnInit, signal } from '@angular/core';
import { VehicleControllerApiService, VehicleSummaryDTO, VehicleSummaryDTOTransmissionTypeEnum } from '@core/api/v1';
import { NzTableComponent, NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-vehicles-list',
  imports: [NzTableComponent, NzDividerComponent, NzTypographyComponent, NzTableModule],
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

  protected readonly VehicleSummaryDTOTransmissionTypeEnum = VehicleSummaryDTOTransmissionTypeEnum;
}
