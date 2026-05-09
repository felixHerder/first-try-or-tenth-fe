import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
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
import { NzModalModule } from 'ng-zorro-antd/modal';
import { InstructorsMultiSelectionModalComponent } from '@features/instructors/instructors-multi-selection-modal/instructors-multi-selection-modal.component';
import { LoaderService } from '@core/services/loader.service';
import { TraineesMultiSelectionModalComponent } from '@features/trainees/trainees-multi-selection-modal/trainees-multi-selection-modal.component';

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
    NzModalModule,
    InstructorsTableComponent,
    NzFlexDirective,
    TraineesTableComponent,
    SessionsTableComponent,
    InstructorsMultiSelectionModalComponent,
    TraineesMultiSelectionModalComponent,
  ],
  templateUrl: './vehicle-details.component.html',
  styleUrl: './vehicle-details.component.css',
})
export class VehicleDetailsComponent implements OnInit {
  private vehicleService = inject(VehicleControllerApiService);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);
  private notification = inject(NzNotificationService);
  private loaderService = inject(LoaderService);
  private router = inject(Router);

  EngineTypeEnum = VehicleDetailsDTOEngineTypeEnum;
  engineTypeOptions = Object.values(this.EngineTypeEnum).filter(this.enumFilter);
  FuelTypeEnum = VehicleDetailsDTOFuelTypeEnum;
  fuelTypeOptions = Object.values(this.FuelTypeEnum).filter(this.enumFilter);
  TransmissionTypeEnum = VehicleDetailsDTOTransmissionTypeEnum;
  transmissionTypeOptions = Object.values(this.TransmissionTypeEnum).filter(this.enumFilter);
  uuid = this.route.snapshot.paramMap.get('uuid');

  loading = this.loaderService.loading;
  instructors = signal<InstructorSummaryDTO[]>([]);
  instructorUuids = computed(() => new Set(this.instructors().map((i) => i.uuid)));
  trainees = signal<TraineeSummaryDTO[]>([]);
  sessions = signal<SessionSummaryDTO[]>([]);
  isDeleteVisible = signal(false);
  isInstructorsModalOpen = signal(false);
  traineeUuids = computed(() => new Set(this.trainees().map((t) => t.uuid)));
  isTraineesModalOpen = signal(false);

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
    this.loadVehicle();
  }

  private loadVehicle() {
    this.loading.set(true);
    this.uuid &&
      this.vehicleService.getByUuid({ uuid: this.uuid }).subscribe({
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
    this.loading.set(true);
    const formValues = this.vehicleForm.getRawValue();
    if (this.vehicleForm.valid && this.uuid !== null) {
      this.vehicleService
        .updateVehicleDetails({ uuid: this.uuid, vehicleDetailsDTO: formValues })
        .subscribe({
          next: () => {
            this.loading.set(false);
            this.notification.success('Success', 'Vehicle was successfully updated!');
          },
          error: (err) => {
            this.loading.set(false);
            throw new Error(err);
          },
        });
    }
  }

  private enumFilter<T>(val: T) {
    return typeof val === 'number';
  }

  onDeleteOk() {
    this.uuid &&
      this.vehicleService.deleteVehicle({ uuid: this.uuid }).subscribe({
        next: () => {
          this.loading.set(false);
          this.notification.success('Success', 'Vehicle was successfully deleted!');
          this.router.navigate(['..'], { relativeTo: this.route }).then();
        },
        error: (err) => {
          this.loading.set(false);
          throw new Error(err);
        },
      });
  }

  openDeleteModal() {
    this.isDeleteVisible.set(true);
  }

  onDeleteCancel() {
    this.isDeleteVisible.set(false);
  }

  onInstructorAssignClick() {
    this.isInstructorsModalOpen.set(true);
  }

  onInstructorsModalOk(checkedUuids: Set<string>) {
    this.uuid &&
      this.vehicleService
        .updateVehicleInstructors({ uuid: this.uuid, requestBody: Array.from(checkedUuids) })
        .subscribe({
          next: () => {
            this.loading.set(false);
            this.notification.success('Success', 'Vehicle instructors were successfully updated!');
            this.loadVehicle();
            this.isInstructorsModalOpen.set(false);
          },
          error: (err) => {
            this.loading.set(false);
            throw new Error(err);
          },
        });
  }

  onInstructorsModalCancel() {
    this.isInstructorsModalOpen.set(false);
  }

  onTraineeAssignClick() {
    this.isTraineesModalOpen.set(true);
  }

  onTraineesModalCancel() {
    this.isTraineesModalOpen.set(false);
  }

  onTraineesModalOk(checkedUuids: Set<string>) {
    this.uuid &&
      this.vehicleService
        .updateVehicleTrainees({ uuid: this.uuid, requestBody: Array.from(checkedUuids) })
        .subscribe({
          next: () => {
            this.loading.set(false);
            this.notification.success('Success', 'Vehicle trainees were successfully updated!');
            this.loadVehicle();
            this.isTraineesModalOpen.set(false);
          },
          error: (err) => {
            this.loading.set(false);
            throw new Error(err);
          },
        });
  }
}
