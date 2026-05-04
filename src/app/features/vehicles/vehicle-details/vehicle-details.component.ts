import { Component, inject, OnInit, signal } from '@angular/core';
import {
  InstructorSummaryDTO,
  SessionSummaryDTO,
  TraineeSummaryDTO,
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
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { InstructorsTableComponent } from '@features/instructors/intructors-table/instructors-table.component';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { TraineesTableComponent } from '@features/trainees/trainees-table/trainees-table.component';
import { SessionsTableComponent } from '@features/sessions/sessions-table/sessions-table.component';

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
    InstructorsTableComponent,
    NzFlexDirective,
    TraineesTableComponent,
    SessionsTableComponent,
  ],
  templateUrl: './vehicle-details.component.html',
  styleUrl: './vehicle-details.component.css',
})
export class VehicleDetailsComponent implements OnInit {
  private vehicleService = inject(VehicleControllerApiService);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);
  private notification = inject(NzNotificationService);

  EngineTypeEnum = VehicleDetailsDTOEngineTypeEnum;
  engineTypeOptions = Object.values(this.EngineTypeEnum).filter(this.enumFilter);
  FuelTypeEnum = VehicleDetailsDTOFuelTypeEnum;
  fuelTypeOptions = Object.values(this.FuelTypeEnum).filter(this.enumFilter);
  TransmissionTypeEnum = VehicleDetailsDTOTransmissionTypeEnum;
  transmissionTypeOptions = Object.values(this.TransmissionTypeEnum).filter(this.enumFilter);

  loading = signal(false);
  instructors = signal<InstructorSummaryDTO[]>([]);
  trainees = signal<TraineeSummaryDTO[]>([]);
  sessions = signal<SessionSummaryDTO[]>([]);

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
    this.loading.set(true);
    this.vehicleService.getByUuid({ uuid }).subscribe({
      next: (vehicleDetails) => {
        this.loading.set(false);
        this.vehicleForm.patchValue(vehicleDetails);
        if (vehicleDetails.instructors) {
          this.instructors.set(Array.from(vehicleDetails.instructors));
        }
        if (vehicleDetails.trainees) {
          this.trainees.set(Array.from(vehicleDetails.trainees));
        }
        if (vehicleDetails.sessions) {
          this.sessions.set(Array.from(vehicleDetails.sessions));
        }
      },
      error: (err) => {
        this.loading.set(false);
        throw new Error(err);
      },
    });
  }

  submitForm() {
    const formValues = this.vehicleForm.getRawValue();
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (this.vehicleForm.valid && uuid !== null) {
      this.vehicleService
        .updateVehicleDetails({ uuid: uuid, vehicleDetailsDTO: formValues })
        .subscribe({
          next: () => {
            this.notification.success('Success', 'Vehicle was successfully updated!');
          },
        });
    }
  }

  private enumFilter<T>(val: T) {
    return typeof val === 'number';
  }
}
