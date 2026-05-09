import { Component, inject } from '@angular/core';
import { InstructorControllerApiService, ProfileDTO } from '@core/api/v1';
import { LoaderService } from '@core/services/loader.service';
import { Router } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ToFormControls } from '@shared/utils/form-types';
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
import { AppRouteConfig } from '@/app.routes.config';

@Component({
  selector: 'app-instructor-create',
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
  templateUrl: './instructor-create.component.html',
  styleUrl: './instructor-create.component.css',
})
export class InstructorCreateComponent {
  private instructorService = inject(InstructorControllerApiService);
  private loaderService = inject(LoaderService);
  private fb = inject(NonNullableFormBuilder);
  private notification = inject(NzNotificationService);
  private router = inject(Router);

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
      this.instructorService
        .createInstructor({ instructorDetailsDTO: { profile: formValues } })
        .subscribe({
          next: (instructor) => {
            this.loading.set(false);
            this.notification.success('Success', 'Instructor was successfully created!');
            this.router.navigate(['/', AppRouteConfig.INSTRUCTORS.path, instructor.uuid]).then();
          },
          error: (err) => {
            this.loading.set(false);
            throw new Error(err);
          },
        });
    }
  }
}
