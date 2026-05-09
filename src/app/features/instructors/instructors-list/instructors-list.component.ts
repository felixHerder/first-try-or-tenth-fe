import { Component, inject, OnInit, signal } from '@angular/core';
import { InstructorsTableComponent } from '@features/instructors/intructors-table/instructors-table.component';
import { InstructorControllerApiService, InstructorSummaryDTO } from '@core/api/v1';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { AppRouteConfig } from '@/app.routes.config';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-instructors-list',
  imports: [
    InstructorsTableComponent,
    NzButtonComponent,
    NzFlexDirective,
    NzIconDirective,
    RouterLink,
  ],
  templateUrl: './instructors-list.component.html',
  styleUrl: './instructors-list.component.css',
})
export class InstructorsListComponent implements OnInit {
  private instructorsApi = inject(InstructorControllerApiService);
  loading = signal<boolean>(false);
  instructors = signal<InstructorSummaryDTO[]>([]);

  ngOnInit(): void {
    this.loading.set(true);
    this.instructorsApi.getAll3().subscribe({
      next: (instructors) => {
        this.loading.set(false);
        this.instructors.set(instructors);
      },
      error: (err) => {
        this.loading.set(false);
        throw new Error(err);
      },
    });
  }

  protected readonly AppRouteConfig = AppRouteConfig;
}
