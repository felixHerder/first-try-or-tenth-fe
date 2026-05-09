import { Component, inject, OnInit, signal } from '@angular/core';
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
import { LoaderService } from '@core/services/loader.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AppRouteConfig } from '@/app.routes.config';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstructorsMultiSelectionModalComponent } from '@features/instructors/instructors-multi-selection-modal/instructors-multi-selection-modal.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzDescriptionsComponent, NzDescriptionsItemComponent } from 'ng-zorro-antd/descriptions';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
  NzFormModule,
} from 'ng-zorro-antd/form';
import { NzRowDirective } from 'ng-zorro-antd/grid';
import { NzWaveDirective } from 'ng-zorro-antd/core/wave';
import { TraineesMultiSelectionModalComponent } from '@features/trainees/trainees-multi-selection-modal/trainees-multi-selection-modal.component';
import { VehiclesMultiSelectionModalComponent } from '@features/vehicles/vehicles-multi-selection-modal/vehicles-multi-selection-modal.component';
import { NzModalComponent, NzModalModule } from 'ng-zorro-antd/modal';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-session-details',
  imports: [
    FormsModule,
    InstructorsMultiSelectionModalComponent,
    NzButtonComponent,
    NzDatePickerComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzDividerComponent,
    NzFlexDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzRowDirective,
    NzWaveDirective,
    NzFormModule,
    ReactiveFormsModule,
    TraineesMultiSelectionModalComponent,
    VehiclesMultiSelectionModalComponent,
    RouterLink,
    NzModalComponent,
    DatePipe,
    NzModalModule,
  ],
  templateUrl: './session-details.component.html',
  styleUrl: './session-details.component.css',
})
export class SessionDetailsComponent implements OnInit {
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
  private route = inject(ActivatedRoute);
  uuid = this.route.snapshot.paramMap.get('uuid');

  scheduledAt = new FormControl(new Date(Date.now()), { nonNullable: true });
  private traineeUuid: string | null = null;
  traineeUuids = new Set<string>();
  private instructorUuid: string | null = null;
  instructorUuids = new Set<string>();
  private vehicleUuid: string | null = null;
  vehicleUuids = new Set<string>();

  trainee = signal<TraineeDetailsDTO | null>(null);
  instructor = signal<InstructorDetailsDTO | null>(null);
  vehicle = signal<VehicleDetailsDTO | null>(null);

  loading = this.loaderService.loading;
  isInstructorsModalOpen = signal(false);
  isVehiclesModalOpen = signal(false);
  isTraineesModalOpen = signal(false);
  isDeleteVisible = signal(false);

  ngOnInit() {
    this.loadSession();
  }

  private loadSession() {
    this.loading.set(true);
    this.uuid &&
      this.sessionService.getDetails({ uuid: this.uuid }).subscribe({
        next: (session) => {
          this.scheduledAt.setValue(new Date(session.scheduledAt));
          this.instructorUuid = session.instructor.uuid;
          this.instructorUuids.add(session.instructor.uuid);
          this.traineeUuid = session.trainee.uuid;
          this.traineeUuids.add(session.trainee.uuid);
          this.vehicleUuid = session.vehicle.uuid;
          this.vehicleUuids.add(session.vehicle.uuid);
          this.loadTrainee(session.trainee.uuid);
          this.loadInstructor(session.instructor.uuid);
          this.loadVehicle(session.vehicle.uuid);
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);
          throw new Error(err);
        },
      });
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
      this.loadInstructor(uuid);
    }
  }

  private loadInstructor(uuid: string) {
    this.loading.set(true);
    this.instructorService.getDetails2({ uuid }).subscribe({
      next: (instructor) => {
        this.isInstructorsModalOpen.set(false);
        this.loading.set(false);
        this.instructor.set(instructor);
      },
      error: (err) => {
        this.loading.set(false);
        throw new Error(err);
      },
    });
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
      this.loadTrainee(uuid);
    }
  }

  private loadTrainee(uuid: string) {
    this.loading.set(true);
    this.traineeService.getDetails1({ uuid }).subscribe({
      next: (trainee) => {
        this.isTraineesModalOpen.set(false);
        this.loading.set(false);
        this.trainee.set(trainee);
      },
      error: (err) => {
        this.loading.set(false);
        throw new Error(err);
      },
    });
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
      this.loadVehicle(uuid);
    }
  }

  private loadVehicle(uuid: string) {
    this.loading.set(true);
    this.vehicleService.getByUuid({ uuid }).subscribe({
      next: (vehicle) => {
        this.isVehiclesModalOpen.set(false);
        this.loading.set(false);
        this.vehicle.set(vehicle);
      },
      error: (err) => {
        this.loading.set(false);
        throw new Error(err);
      },
    });
  }

  isFormValid(): boolean {
    return (
      this.scheduledAt.getRawValue() !== null &&
      this.traineeUuid !== null &&
      this.instructorUuid !== null &&
      this.vehicleUuid !== null
    );
  }

  saveSession() {
    if (
      this.scheduledAt.getRawValue() &&
      this.instructorUuid &&
      this.traineeUuid &&
      this.vehicleUuid
    ) {
      this.loading.set(true);
      this.sessionService
        .createSession({
          sessionCreateDTO: {
            scheduledAt: this.scheduledAt.getRawValue().toISOString(),
            instructorUuid: this.instructorUuid,
            traineeUuid: this.traineeUuid,
            vehicleUuid: this.vehicleUuid,
          },
        })
        .subscribe({
          next: () => {
            this.loading.set(false);
            this.notification.success('Success', 'Session was successfully updated!');
            this.router.navigate(['..'], { relativeTo: this.route }).then();
          },
          error: (err) => {
            this.loading.set(false);
            throw new Error(err);
          },
        });
    }
  }

  openDeleteModal() {
    this.isDeleteVisible.set(true);
  }

  onDeleteOk() {
    this.uuid &&
      this.sessionService.deleteSession({ uuid: this.uuid }).subscribe({
        next: () => {
          this.loading.set(false);
          this.notification.success('Success', 'Session was successfully deleted!');
          this.router.navigate(['..'], { relativeTo: this.route }).then();
        },
        error: (err) => {
          this.loading.set(false);
          throw new Error(err);
        },
      });
  }

  onDeleteCancel() {
    this.isDeleteVisible.set(false);
  }

  protected readonly formatDate = formatDate;
}
