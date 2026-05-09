import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  VehicleControllerApiService,
  VehicleDetailsDTO,
  VehicleDetailsDTOEngineTypeEnum,
  VehicleDetailsDTOFuelTypeEnum,
  VehicleDetailsDTOTransmissionTypeEnum,
} from '@core/api/v1';
import { ToFormControls } from '@shared/utils/form-types';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoaderService } from '@core/services/loader.service';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-vehicle-create',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzDividerModule,
    NzGridModule,
    NzModalModule,
  ],
  templateUrl: './vehicle-create.component.html',
  styleUrl: './vehicle-create.component.css',
})
export class VehicleCreateComponent {
  private vehicleService = inject(VehicleControllerApiService);
  private fb = inject(NonNullableFormBuilder);
  private notification = inject(NzNotificationService);
  private loaderService = inject(LoaderService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  EngineTypeEnum = VehicleDetailsDTOEngineTypeEnum;
  engineTypeOptions = Object.values(this.EngineTypeEnum).filter(this.enumFilter);
  FuelTypeEnum = VehicleDetailsDTOFuelTypeEnum;
  fuelTypeOptions = Object.values(this.FuelTypeEnum).filter(this.enumFilter);
  TransmissionTypeEnum = VehicleDetailsDTOTransmissionTypeEnum;
  transmissionTypeOptions = Object.values(this.TransmissionTypeEnum).filter(this.enumFilter);

  loading = this.loaderService.loading;

  private enumFilter<T>(val: T) {
    return typeof val === 'number';
  }

  vehicleForm = this.fb.group<ToFormControls<VehicleDetailsDTO>>({
    model: this.fb.control('', [Validators.required]),
    make: this.fb.control('', [Validators.required]),
    year: this.fb.control('', [Validators.required]),
    licensePlate: this.fb.control('', [Validators.required]),
    color: this.fb.control('', [Validators.required]),
    engineType: this.fb.control(VehicleDetailsDTOEngineTypeEnum.INTERNAL_COMBUSTION, [
      Validators.required,
    ]),
    fuelType: this.fb.control(VehicleDetailsDTOFuelTypeEnum.GASOLINE, [Validators.required]),
    transmissionType: this.fb.control(VehicleDetailsDTOTransmissionTypeEnum.AUTOMATIC, [
      Validators.required,
    ]),
    imageUrl: this.fb.control('', []),
  });

  submitForm() {
    this.loading.set(true);
    const formValues = this.vehicleForm.getRawValue();
    if (this.vehicleForm.valid) {
      this.vehicleService.createVehicle({ vehicleDetailsDTO: formValues }).subscribe({
        next: (vehicle) => {
          this.loading.set(false);
          this.notification.success('Success', 'Vehicle was created successfully!');
          this.router.navigate(['..', vehicle.uuid], { relativeTo: this.route }).then();
        },
        error: (err) => {
          this.loading.set(false);
          throw new Error(err);
        },
      });
    }
  }
}
