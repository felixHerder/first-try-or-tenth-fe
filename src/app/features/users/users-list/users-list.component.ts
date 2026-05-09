import { Component, inject, OnInit, signal } from '@angular/core';
import {
  NzCellAlignDirective,
  NzTableCellDirective,
  NzTableComponent,
  NzTbodyComponent,
  NzTheadComponent,
  NzThMeasureDirective,
  NzTrDirective,
} from 'ng-zorro-antd/table';
import { AppRouteConfig } from '@/app.routes.config';
import { RouterLink } from '@angular/router';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { UserControllerApiService, UserDetailsDTO } from '@core/api/v1';

@Component({
  selector: 'app-users-list',
  imports: [
    NzCellAlignDirective,
    NzTableCellDirective,
    NzTableComponent,
    NzTbodyComponent,
    NzThMeasureDirective,
    NzTheadComponent,
    NzTrDirective,
    RouterLink,
    NzButtonComponent,
    NzFlexDirective,
    NzIconDirective,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {
  protected readonly AppRouteConfig = AppRouteConfig;
  private userService = inject(UserControllerApiService);

  users = signal<UserDetailsDTO[]>([]);
  loading = signal(false);

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers() {
    this.loading.set(true);
    this.userService.getAll4().subscribe({
      next: (users) => {
        this.loading.set(false);
        this.users.set(users);
      },
      error: (err) => {
        this.loading.set(false);
        throw new Error(err);
      },
    });
  }
}
