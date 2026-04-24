import { Component, inject, OnInit } from '@angular/core';
import {
  VehicleControllerApiService,
  VehicleDetailsDTO,
  VehicleDetailsDTOEngineTypeEnum,
  VehicleDetailsDTOFuelTypeEnum,
  VehicleDetailsDTOTransmissionTypeEnum,
} from '@core/api/v1';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToFormControls } from '@shared/utils/form-types';
import { ActivatedRoute } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-vehicle-details',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzDividerModule,
    NzGridModule,
  ],
  templateUrl: './vehicle-details.component.html',
  styleUrl: './vehicle-details.component.css',
})
export class VehicleDetailsComponent implements OnInit {
  private vehicleService = inject(VehicleControllerApiService);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);

  EngineTypeEnum = VehicleDetailsDTOEngineTypeEnum;
  engineTypeOptions = Object.values(this.EngineTypeEnum).filter(this.enumFilter);
  FuelTypeEnum = VehicleDetailsDTOFuelTypeEnum;
  fuelTypeOptions = Object.values(this.FuelTypeEnum).filter(this.enumFilter);
  TransmissionTypeEnum = VehicleDetailsDTOTransmissionTypeEnum;
  transmissionTypeOptions = Object.values(this.TransmissionTypeEnum).filter(this.enumFilter);

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

  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (uuid) {
      this.loadVehicle(uuid);
    }
  }

  private loadVehicle(uuid: string) {
    this.vehicleService.getByUuid({ uuid }).subscribe({
      next: (vehicleDetails) => {
        this.vehicleForm.patchValue(vehicleDetails);
      },
    });
  }

  submitForm() {
    if (this.vehicleForm.valid) {
      console.log(this.vehicleForm.getRawValue());
    }
  }

  private enumFilter<T>(val: T) {
    return typeof val === 'number';
  }
}
