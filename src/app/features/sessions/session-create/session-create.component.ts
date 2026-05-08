import { Component, inject, signal } from '@angular/core';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzRowDirective } from 'ng-zorro-antd/grid';
import { InstructorsMultiSelectionModalComponent } from '@features/instructors/instructors-multi-selection-modal/instructors-multi-selection-modal.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzDescriptionsComponent, NzDescriptionsItemComponent } from 'ng-zorro-antd/descriptions';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzWaveDirective } from 'ng-zorro-antd/core/wave';
import { AppRouteConfig } from '@/app.routes.config';
import {
  InstructorControllerApiService,
  InstructorDetailsDTO,
  SessionControllerApiService,
  TraineeControllerApiService,
  TraineeDetailsDTO,
  VehicleControllerApiService,
  VehicleDetailsDTO,
  VehicleSummaryDTOEngineTypeEnum,
  VehicleSummaryDTOTransmissionTypeEnum,
} from '@core/api/v1';
import { Router, RouterLink } from '@angular/router';
import { LoaderService } from '@core/services/loader.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TraineesMultiSelectionModalComponent } from '@features/trainees/trainees-multi-selection-modal/trainees-multi-selection-modal.component';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { VehiclesMultiSelectionModalComponent } from '@features/vehicles/vehicles-multi-selection-modal/vehicles-multi-selection-modal.component';

@Component({
  selector: 'app-session-create',
  imports: [
    FormsModule,
    NzDatePickerModule,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzRowDirective,
    NzFormDirective,
    NzFormControlComponent,
    InstructorsMultiSelectionModalComponent,
    NzButtonComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzFlexDirective,
    NzWaveDirective,
    RouterLink,
    TraineesMultiSelectionModalComponent,
    NzDividerComponent,
    VehiclesMultiSelectionModalComponent,
  ],
  templateUrl: './session-create.component.html',
  styleUrl: './session-create.component.css',
})
export class SessionCreateComponent {
  protected readonly AppRouteConfig = AppRouteConfig;
  protected readonly VehicleSummaryDTOTransmissionTypeEnum = VehicleSummaryDTOTransmissionTypeEnum;
  protected readonly VehicleSummaryDTOEngineTypeEnum = VehicleSummaryDTOEngineTypeEnum;
  private instructorService = inject(InstructorControllerApiService);
  private traineeService = inject(TraineeControllerApiService);
  private vehicleService = inject(VehicleControllerApiService);
  private sessionService = inject(SessionControllerApiService);
  private loaderService = inject(LoaderService);
  private notification = inject(NzNotificationService);
  private router = inject(Router);

  private scheduledAt: Date | null = null;
  private traineeUuid: string | null = null;
  private instructorUuid: string | null = null;
  private vehicleUuid: string | null = null;

  trainee = signal<TraineeDetailsDTO | null>(null);
  instructor = signal<InstructorDetailsDTO | null>(null);
  vehicle = signal<VehicleDetailsDTO | null>(null);

  loading = this.loaderService.loading;
  isInstructorsModalOpen = signal(false);
  isVehiclesModalOpen = signal(false);
  isTraineesModalOpen = signal(false);

  onDateChange(dateTime: Date): void {
    this.scheduledAt = dateTime;
  }

  onAssignInstructorClick() {
    this.isInstructorsModalOpen.set(true);
  }

  onInstructorsModalCancel() {
    this.isInstructorsModalOpen.set(false);
  }

  onInstructorsModalOk(uuids: Set<string>) {
    const uuid = uuids.values().next()?.value;
    if (uuid) {
      this.loading.set(true);
      this.instructorService.getDetails2({ uuid }).subscribe({
        next: (instructor) => {
          this.isInstructorsModalOpen.set(false);
          this.loading.set(false);
          this.instructor.set(instructor);
          this.instructorUuid = uuid;
        },
        error: (err) => {
          this.loading.set(false);
          throw new Error(err);
        },
      });
    }
  }

  onAssignTraineeClick() {
    this.isTraineesModalOpen.set(true);
  }

  onTraineesModalCancel() {
    this.isTraineesModalOpen.set(false);
  }

  onTraineesModalOk(uuids: Set<string>) {
    const uuid = uuids.values().next()?.value;
    if (uuid) {
      this.loading.set(true);
      this.traineeService.getDetails1({ uuid }).subscribe({
        next: (trainee) => {
          this.isTraineesModalOpen.set(false);
          this.loading.set(false);
          this.trainee.set(trainee);
          this.traineeUuid = uuid;
        },
        error: (err) => {
          this.loading.set(false);
          throw new Error(err);
        },
      });
    }
  }

  onAssignVehicleClick() {
    this.isVehiclesModalOpen.set(true);
  }

  onVehiclesModalCancel() {
    this.isVehiclesModalOpen.set(false);
  }

  onVehiclesModalOk(uuids: Set<string>) {
    const uuid = uuids.values().next()?.value;
    if (uuid) {
      this.loading.set(true);
      this.vehicleService.getByUuid({ uuid }).subscribe({
        next: (vehicle) => {
          this.isVehiclesModalOpen.set(false);
          this.loading.set(false);
          this.vehicle.set(vehicle);
          this.vehicleUuid = uuid;
        },
        error: (err) => {
          this.loading.set(false);
          throw new Error(err);
        },
      });
    }
  }

  isFormValid(): boolean {
    return (
      this.scheduledAt !== null &&
      this.traineeUuid !== null &&
      this.instructorUuid !== null &&
      this.vehicleUuid !== null
    );
  }

  addSession() {
    if (this.scheduledAt && this.instructorUuid && this.traineeUuid && this.vehicleUuid) {
      this.loading.set(true);
      this.sessionService
        .createSession({
          sessionCreateDTO: {
            scheduledAt: this.scheduledAt.toISOString(),
            instructorUuid: this.instructorUuid,
            traineeUuid: this.traineeUuid,
            vehicleUuid: this.vehicleUuid,
          },
        })
        .subscribe({
          next: (session) => {
            this.loading.set(false);
            this.notification.success('Success', 'SEssion was successfully created!');
            this.router.navigate(['/', AppRouteConfig.SESSIONS.path, session.uuid]).then();
          },
          error: (err) => {
            this.loading.set(false);
            throw new Error(err);
          },
        });
    }
  }
}
