import { Component, inject, OnInit, signal } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import {
  NzInputDirective,
  NzInputPasswordDirective,
  NzInputPrefixDirective,
  NzInputWrapperComponent,
} from 'ng-zorro-antd/input';
import { NzWaveDirective } from 'ng-zorro-antd/core/wave';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { ProfileDTO, UserControllerApiService, UserEditDTO } from '@core/api/v1';
import { LoaderService } from '@core/services/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ToFormControls } from '@shared/utils/form-types';
import { AppRouteConfig } from '@/app.routes.config';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-details',
  imports: [
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzIconDirective,
    NzInputDirective,
    NzInputPasswordDirective,
    NzInputPrefixDirective,
    NzInputWrapperComponent,
    NzRowDirective,
    NzWaveDirective,
    ReactiveFormsModule,
    NzFlexDirective,
    NzModalModule,
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  private userService = inject(UserControllerApiService);
  private loaderService = inject(LoaderService);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);
  private notification = inject(NzNotificationService);
  private router = inject(Router);
  uuid = this.route.snapshot.paramMap.get('uuid');
  protected readonly AppRouteConfig = AppRouteConfig;

  loading = this.loaderService.loading;
  isDeleteVisible = signal(false);

  userForm = this.fb.group<ToFormControls<UserEditDTO>>({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
    profile: this.fb.group<ToFormControls<ProfileDTO>>({
      name: this.fb.control('', [Validators.required]),
      phoneNumber: this.fb.control('', [Validators.required]),
      address: this.fb.control(''),
    }),
  });

  ngOnInit() {
    this.loadUser();
  }

  private loadUser() {
    this.loading.set(true);
    this.uuid &&
      this.userService.getByUuid1({ uuid: this.uuid }).subscribe({
        next: (user) => {
          this.loading.set(false);
          this.userForm.patchValue(user);
        },
        error: (err) => {
          this.loading.set(false);
          throw new Error(err);
        },
      });
  }

  submitForm() {
    this.loading.set(true);
    const formValues = this.userForm.getRawValue();
    if (this.userForm.valid && this.uuid) {
      this.userService.editUser({ uuid: this.uuid, userEditDTO: formValues }).subscribe({
        next: () => {
          this.loading.set(false);
          this.notification.success('Success', 'User was successfully saved!');
          this.router.navigate(['/', AppRouteConfig.USERS.path]).then();
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
      this.userService.removeUser({ uuid: this.uuid }).subscribe({
        next: () => {
          this.loading.set(false);
          this.notification.success('Success', 'User was successfully deleted!');
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
