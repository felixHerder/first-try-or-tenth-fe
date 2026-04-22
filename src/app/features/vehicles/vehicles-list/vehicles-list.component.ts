import { Component, inject, OnInit, signal } from '@angular/core';
import { VehicleControllerApiService, VehicleSummaryDTO } from '@core/api/v1';

@Component({
  selector: 'app-vehicles-list',
  imports: [],
  templateUrl: './vehicles-list.component.html',
  styleUrl: './vehicles-list.component.css',
})
export class VehiclesListComponent implements OnInit {
  private vehiclesApi = inject(VehicleControllerApiService);
  vehicles = signal<VehicleSummaryDTO[]>([]);

  ngOnInit(): void {
    this.vehiclesApi.getAll().subscribe((vehicles) => {
      this.vehicles.set(vehicles);
    });
  }
}
