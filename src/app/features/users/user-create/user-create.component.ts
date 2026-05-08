import { Component, inject } from '@angular/core';
import { AppRouteConfig } from '@/app.routes.config';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
  NzFormModule,
} from 'ng-zorro-antd/form';
import {
  NzInputDirective,
  NzInputPasswordDirective,
  NzInputPrefixDirective,
  NzInputWrapperComponent,
} from 'ng-zorro-antd/input';
import { NzWaveDirective } from 'ng-zorro-antd/core/wave';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { ProfileDTO, UserControllerApiService, UserRegisterDTO } from '@core/api/v1';
import { LoaderService } from '@core/services/loader.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ToFormControls } from '@shared/utils/form-types';

@Component({
  selector: 'app-user-create',
  imports: [
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzButtonComponent,
    NzFormModule,
    NzRowDirective,
    NzWaveDirective,
    ReactiveFormsModule,
    NzInputPrefixDirective,
    NzInputPasswordDirective,
    NzInputWrapperComponent,
    NzIconDirective,
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css',
})
export class UserCreateComponent {
  private userService = inject(UserControllerApiService);
  private loaderService = inject(LoaderService);
  private fb = inject(NonNullableFormBuilder);
  private notification = inject(NzNotificationService);
  private router = inject(Router);
  protected readonly AppRouteConfig = AppRouteConfig;

  loading = this.loaderService.loading;

  userForm = this.fb.group<ToFormControls<UserRegisterDTO>>({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
    profile: this.fb.group<ToFormControls<ProfileDTO>>({
      name: this.fb.control('', [Validators.required]),
      phoneNumber: this.fb.control('', [Validators.required]),
      address: this.fb.control(''),
    }),
  });

  submitForm() {
    this.loading.set(true);
    const formValues = this.userForm.getRawValue();
    if (this.userForm.valid) {
      this.userService.registerUser({ userRegisterDTO: formValues }).subscribe({
        next: (user) => {
          this.loading.set(false);
          this.notification.success('Success', 'User was successfully created!');
          this.router.navigate(['/', AppRouteConfig.USERS.path, user.uuid]).then();
        },
        error: (err) => {
          this.loading.set(false);
          throw new Error(err);
        },
      });
    }
  }
}
