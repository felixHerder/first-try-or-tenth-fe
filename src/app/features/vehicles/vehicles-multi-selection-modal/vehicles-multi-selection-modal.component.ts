import { Component, inject, input, linkedSignal, OnInit, output, signal } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import {
  VehicleControllerApiService,
  VehicleSummaryDTO,
  VehicleSummaryDTOEngineTypeEnum,
  VehicleSummaryDTOTransmissionTypeEnum,
} from '@core/api/v1';

@Component({
  selector: 'app-vehicles-multi-selection-modal',
  imports: [NzModalModule, NzTableModule],
  templateUrl: './vehicles-multi-selection-modal.component.html',
  styleUrl: './vehicles-multi-selection-modal.component.css',
})
export class VehiclesMultiSelectionModalComponent implements OnInit {
  isOpen = input(false);
  vehicleUuids = input<Set<string>>(new Set());
  checkedVehicleUuids = linkedSignal(() => this.vehicleUuids());
  onOk = output<Set<string>>();
  onCancel = output();
  loading = signal(false);
  vehicles = signal<VehicleSummaryDTO[]>([]);
  private vehicleService = inject(VehicleControllerApiService);

  protected readonly VehicleSummaryDTOEngineTypeEnum = VehicleSummaryDTOEngineTypeEnum;
  protected readonly VehicleSummaryDTOTransmissionTypeEnum = VehicleSummaryDTOTransmissionTypeEnum;

  ngOnInit(): void {
    this.loadVehicles();
  }

  onModalCancel() {
    this.onCancel.emit();
  }

  onModalOk() {
    this.onOk.emit(this.checkedVehicleUuids());
  }

  onCheckedChange(uuid: string, checked: boolean) {
    if (checked) {
      this.checkedVehicleUuids().add(uuid);
    } else {
      this.checkedVehicleUuids().delete(uuid);
    }
  }

  private loadVehicles() {
    this.loading.set(true);
    this.vehicleService.getAll().subscribe({
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
