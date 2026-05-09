import { Component, inject } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzWaveDirective } from 'ng-zorro-antd/core/wave';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileDTO, TraineeControllerApiService } from '@core/api/v1';
import { LoaderService } from '@core/services/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ToFormControls } from '@shared/utils/form-types';
import { AppRouteConfig } from '@/app.routes.config';

@Component({
  selector: 'app-trainee-create',
  imports: [
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzRowDirective,
    NzWaveDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './trainee-create.component.html',
  styleUrl: './trainee-create.component.css',
})
export class TraineeCreateComponent {
  private traineeService = inject(TraineeControllerApiService);
  private loaderService = inject(LoaderService);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);
  private notification = inject(NzNotificationService);
  private router = inject(Router);
  uuid = this.route.snapshot.paramMap.get('uuid');
  protected readonly AppRouteConfig = AppRouteConfig;

  loading = this.loaderService.loading;

  profileForm = this.fb.group<ToFormControls<ProfileDTO>>({
    name: this.fb.control('', [Validators.required]),
    phoneNumber: this.fb.control('', [Validators.required]),
    address: this.fb.control(''),
  });

  submitForm() {
    this.loading.set(true);
    const formValues = this.profileForm.getRawValue();
    if (this.profileForm.valid) {
      this.traineeService.createTrainee({ traineeDetailsDTO: { profile: formValues } }).subscribe({
        next: (trainee) => {
          this.loading.set(false);
          this.notification.success('Success', 'Trainee was successfully created!');
          this.router.navigate(['..', trainee.uuid], { relativeTo: this.route }).then();
        },
        error: (err) => {
          this.loading.set(false);
          throw new Error(err);
        },
      });
    }
  }
}
