import { Component, input } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { VehicleSummaryDTO, VehicleSummaryDTOTransmissionTypeEnum } from '@core/api/v1';
import { RouterLink } from '@angular/router';
import { AppRouteConfig } from '@/app.routes.config';

@Component({
  selector: 'app-vehicles-table',
  imports: [NzTableModule, RouterLink],
  templateUrl: './vehicles-table.component.html',
  styleUrl: './vehicles-table.component.css',
})
export class VehiclesTableComponent {
  protected readonly VehicleSummaryDTOTransmissionTypeEnum = VehicleSummaryDTOTransmissionTypeEnum;
  vehicles = input<VehicleSummaryDTO[]>([]);
  loading = input<Boolean>(false);
  pageSize = input<number>(5);
  routeConfig = AppRouteConfig;
}
