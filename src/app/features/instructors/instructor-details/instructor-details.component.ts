import { Component, inject, OnInit } from '@angular/core';
import { InstructorControllerApiService, ProfileDTO } from '@core/api/v1';
import { LoaderService } from '@core/services/loader.service';
import { ActivatedRoute } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToFormControls } from '@shared/utils/form-types';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzWaveDirective } from 'ng-zorro-antd/core/wave';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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
  ],
  templateUrl: './instructor-details.component.html',
  styleUrl: './instructor-details.component.css',
})
export class InstructorDetailsComponent implements OnInit {
  private instructorService = inject(InstructorControllerApiService);
  private loaderService = inject(LoaderService);
  private loading = this.loaderService.loading;
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);
  private notification = inject(NzNotificationService);
  uuid = this.route.snapshot.paramMap.get('uuid');

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
          console.log(instructor);
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
    throw new Error('Method not implemented.');
  }
}
