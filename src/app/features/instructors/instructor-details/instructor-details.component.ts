import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  InstructorControllerApiService,
  ProfileDTO,
  SessionSummaryDTO,
  TraineeSummaryDTO,
  VehicleSummaryDTO,
} from '@core/api/v1';
import { LoaderService } from '@core/services/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToFormControls } from '@shared/utils/form-types';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzWaveDirective } from 'ng-zorro-antd/core/wave';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { VehiclesMultiSelectionModalComponent } from '@features/vehicles/vehicles-multi-selection-modal/vehicles-multi-selection-modal.component';
import { VehiclesTableComponent } from '@features/vehicles/vehicles-table/vehicles-table.component';
import { SessionsTableComponent } from '@features/sessions/sessions-table/sessions-table.component';
import { TraineesMultiSelectionModalComponent } from '@features/trainees/trainees-multi-selection-modal/trainees-multi-selection-modal.component';
import { TraineesTableComponent } from '@features/trainees/trainees-table/trainees-table.component';

@Component({
  selector: 'app-instructor-details',
  imports: [
    NzButtonComponent,
    NzColDirective,
    NzInputDirective,
    NzRowDirective,
    NzFormModule,
    NzWaveDirective,
    ReactiveFormsModule,
    NzFlexDirective,
    NzModalModule,
    NzDividerComponent,
    VehiclesMultiSelectionModalComponent,
    VehiclesTableComponent,
    SessionsTableComponent,
    TraineesMultiSelectionModalComponent,
    TraineesTableComponent,
  ],
  templateUrl: './instructor-details.component.html',
  styleUrl: './instructor-details.component.css',
})
export class InstructorDetailsComponent implements OnInit {
  private instructorService = inject(InstructorControllerApiService);
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
      this.instructorService.getDetails2({ uuid: this.uuid }).subscribe({
        next: (instructor) => {
          this.loading.set(false);
          this.profileForm.patchValue(instructor.profile);
          if (instructor.vehicles) {
            this.vehicles.set(Array.from(instructor.vehicles));
          }
          if (instructor.trainees) {
            this.trainees.set(Array.from(instructor.trainees));
          }
          if (instructor.sessions) {
            this.sessions.set(Array.from(instructor.sessions));
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
    const formValues = this.profileForm.getRawValue();
    if (this.profileForm.valid && this.uuid !== null) {
      this.instructorService
        .updateInstructorProfile({ uuid: this.uuid, profileDTO: formValues })
        .subscribe({
          next: () => {
            this.loading.set(false);
            this.notification.success('Success', 'Instructor profile was successfully updated!');
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
      this.instructorService.deleteInstructor({ uuid: this.uuid }).subscribe({
        next: () => {
          this.loading.set(false);
          this.notification.success('Success', 'Instructor was successfully deleted!');
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

  onVehicleAssignClick() {
    this.isVehiclesModalOpen.set(true);
  }

  onVehiclesModalOk(checkedUuids: Set<string>) {
    this.uuid &&
      this.instructorService
        .updateInstructorVehicles({ uuid: this.uuid, requestBody: Array.from(checkedUuids) })
        .subscribe({
          next: () => {
            this.loading.set(false);
            this.notification.success('Success', 'Instructor vehicles were successfully updated!');
            this.loadInstructor();
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

  onTraineeAssignClick() {
    this.isTraineesModalOpen.set(true);
  }

  onTraineesModalCancel() {
    this.isTraineesModalOpen.set(false);
  }

  onTraineesModalOk(checkedUuids: Set<string>) {
    this.uuid &&
      this.instructorService
        .updateInstructorTrainees({ uuid: this.uuid, requestBody: Array.from(checkedUuids) })
        .subscribe({
          next: () => {
            this.loading.set(false);
            this.notification.success('Success', 'Instructor trainees were successfully updated!');
            this.loadInstructor();
            this.isTraineesModalOpen.set(false);
          },
          error: (err) => {
            this.loading.set(false);
            throw new Error(err);
          },
        });
  }
}
