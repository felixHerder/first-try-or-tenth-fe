import { Component, inject, OnInit, signal } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzWaveDirective } from 'ng-zorro-antd/core/wave';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ProfileDTO,
  SessionSummaryDTO,
  TraineeControllerApiService,
  TraineeDetailsDTO,
  VehicleDetailsDTO,
  VehicleSummaryDTOTransmissionTypeEnum,
} from '@core/api/v1';
import { LoaderService } from '@core/services/loader.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ToFormControls } from '@shared/utils/form-types';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { InstructorsMultiSelectionModalComponent } from '@features/instructors/instructors-multi-selection-modal/instructors-multi-selection-modal.component';
import { AppRouteConfig } from '@/app.routes.config';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { VehiclesMultiSelectionModalComponent } from '@features/vehicles/vehicles-multi-selection-modal/vehicles-multi-selection-modal.component';
import { SessionsTableComponent } from '@features/sessions/sessions-table/sessions-table.component';

@Component({
  selector: 'app-trainee-details',
  imports: [
    NzButtonComponent,
    NzColDirective,
    NzFlexDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzModalModule,
    NzRowDirective,
    NzWaveDirective,
    ReactiveFormsModule,
    NzDescriptionsModule,
    InstructorsMultiSelectionModalComponent,
    RouterLink,
    NzDividerComponent,
    VehiclesMultiSelectionModalComponent,
    SessionsTableComponent,
  ],
  templateUrl: './trainee-details.component.html',
  styleUrl: './trainee-details.component.css',
})
export class TraineeDetailsComponent implements OnInit {
  private traineeService = inject(TraineeControllerApiService);
  private loaderService = inject(LoaderService);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);
  private notification = inject(NzNotificationService);
  private router = inject(Router);
  uuid = this.route.snapshot.paramMap.get('uuid');
  protected readonly AppRouteConfig = AppRouteConfig;

  loading = this.loaderService.loading;
  trainee = signal<TraineeDetailsDTO | null>(null);
  isDeleteVisible = signal(false);
  isInstructorsModalOpen = signal(false);
  instructorUuids = signal(new Set<string>());
  vehicle = signal<VehicleDetailsDTO | null>(null);
  vehicleUuids = signal(new Set<string>());
  isVehiclesModalOpen = signal(false);
  isTraineesModalOpen = signal(false);
  sessions = signal<SessionSummaryDTO[]>([]);

  profileForm = this.fb.group<ToFormControls<ProfileDTO>>({
    name: this.fb.control('', [Validators.required]),
    phoneNumber: this.fb.control('', [Validators.required]),
    address: this.fb.control(''),
  });

  ngOnInit() {
    this.loadTrainee();
  }

  private loadTrainee() {
    this.loading.set(true);
    this.uuid &&
      this.traineeService.getDetails1({ uuid: this.uuid }).subscribe({
        next: (trainee) => {
          this.profileForm.patchValue(trainee.profile);
          this.trainee.set(trainee);
          if (trainee.instructor?.uuid) {
            this.instructorUuids.set(new Set<string>().add(trainee.instructor?.uuid));
          }
          if (trainee.vehicle?.uuid) {
            this.vehicleUuids.set(new Set<string>().add(trainee.vehicle?.uuid));
          }
          if (trainee.sessions) {
            this.sessions.set(Array.from(trainee.sessions));
          }
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);
          throw new Error(err);
        },
      });
  }

  submitForm() {
    this.loading.set(true);
    const formValues = this.profileForm.getRawValue();
    if (this.profileForm.valid && this.uuid !== null) {
      this.traineeService
        .updateTraineeProfile({ uuid: this.uuid, traineeDetailsDTO: { profile: formValues } })
        .subscribe({
          next: () => {
            this.loading.set(false);
            this.notification.success('Success', 'Trainee profile was successfully updated!');
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
      this.traineeService.deleteTrainee({ uuid: this.uuid }).subscribe({
        next: () => {
          this.loading.set(false);
          this.notification.success('Success', 'Trainee was successfully deleted!');
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

  protected onAssignInstructorClick() {
    this.isInstructorsModalOpen.set(true);
  }

  onInstructorsModalOk(checkedUuids: Set<string>) {
    const checkedUuid = checkedUuids.values().next().value;
    this.uuid &&
      checkedUuid &&
      this.traineeService
        .updateTraineeInstructor({ uuid: this.uuid, body: checkedUuid })
        .subscribe({
          next: () => {
            this.loading.set(false);
            this.notification.success('Success', 'Trainee instructors was successfully updated!');
            this.loadTrainee();
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

  getVehicleTransmission() {
    const type = this.trainee()?.vehicle?.transmissionType;
    return type ? VehicleSummaryDTOTransmissionTypeEnum[type] : '';
  }

  onVehiclesAssignClick() {
    this.isVehiclesModalOpen.set(true);
  }

  onVehiclesModalOk(checkedUuids: Set<string>) {
    const checkedUuid = checkedUuids.values().next().value;
    this.uuid &&
      checkedUuid &&
      this.traineeService.updateTraineeVehicle({ uuid: this.uuid, body: checkedUuid }).subscribe({
        next: () => {
          this.loading.set(false);
          this.notification.success('Success', 'Trainee vehicle was successfully updated!');
          this.loadTrainee();
          this.isVehiclesModalOpen.set(false);
        },
        error: (err) => {
          this.loading.set(false);
          throw new Error(err);
        },
      });
  }

  onVehiclesModalCancel() {
    this.isVehiclesModalOpen.set(false);
  }
}
