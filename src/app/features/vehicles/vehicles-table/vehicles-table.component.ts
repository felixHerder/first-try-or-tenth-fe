import { Component, input } from '@angular/core';
import {
  NzCellAlignDirective,
  NzTableCellDirective,
  NzTableComponent,
  NzTbodyComponent,
  NzTheadComponent,
  NzThMeasureDirective,
  NzTrDirective,
} from 'ng-zorro-antd/table';
import { VehicleSummaryDTO, VehicleSummaryDTOTransmissionTypeEnum } from '@core/api/v1';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vehicles-table',
  imports: [
    NzCellAlignDirective,
    NzTableCellDirective,
    NzTableComponent,
    NzTbodyComponent,
    NzThMeasureDirective,
    NzTheadComponent,
    NzTrDirective,
    RouterLink,
  ],
  templateUrl: './vehicles-table.component.html',
  styleUrl: './vehicles-table.component.css',
})
export class VehiclesTableComponent {
  protected readonly VehicleSummaryDTOTransmissionTypeEnum = VehicleSummaryDTOTransmissionTypeEnum;
  vehicles = input<VehicleSummaryDTO[]>([]);
  loading = input<Boolean>(false);
}
