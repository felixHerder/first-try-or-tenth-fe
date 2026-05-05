import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
  TraineeSummaryDTO,
  VehicleSummaryDTO,
} from '@core/api/v1';
import { LoaderService } from '@core/services/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ToFormControls } from '@shared/utils/form-types';
import { NzModalModule } from 'ng-zorro-antd/modal';

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

  loading = this.loaderService.loading;
  isDeleteVisible = signal(false);
  vehicles = signal<VehicleSummaryDTO[]>([]);
  vehicleUuids = computed(() => new Set(this.vehicles().map((v) => v.uuid)));
  isVehiclesModalOpen = signal(false);
  trainees = signal<TraineeSummaryDTO[]>([]);
  traineeUuids = computed(() => new Set(this.trainees().map((t) => t.uuid)));
  isTraineesModalOpen = signal(false);
  sessions = signal<SessionSummaryDTO[]>([]);

  profileForm = this.fb.group<ToFormControls<ProfileDTO>>({
    name: this.fb.control('', [Validators.required]),
    phoneNumber: this.fb.control('', [Validators.required]),
    address: this.fb.control(''),
  });

  ngOnInit() {
    this.loadInstructor();
  }

  private loadInstructor() {
    this.uuid &&
      this.traineeService.getDetails1({ uuid: this.uuid }).subscribe({
        next: (trainee) => {
          this.loading.set(false);
          this.profileForm.patchValue(trainee.profile);
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
}
