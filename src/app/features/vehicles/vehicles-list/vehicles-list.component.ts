import { Component, inject, OnInit, signal } from '@angular/core';
import { VehicleControllerApiService, VehicleSummaryDTO } from '@core/api/v1';
import { LoaderService } from '@core/services/loader.service';

@Component({
  selector: 'app-vehicles-list',
  imports: [],
  templateUrl: './vehicles-list.component.html',
  styleUrl: './vehicles-list.component.css',
})
export class VehiclesListComponent implements OnInit {
  private vehiclesApi = inject(VehicleControllerApiService);
  private loaderService = inject(LoaderService);
  vehicles = signal<VehicleSummaryDTO[]>([]);

  ngOnInit(): void {
    this.loaderService.setLoading(true);
    this.vehiclesApi.getAll().subscribe({
      next: (vehicles) => {
        this.loaderService.setLoading(false);
        this.vehicles.set(vehicles);
      },
      error: (err) => {
        this.loaderService.setLoading(false);
        console.error(err);
      },
    });
  }
}
